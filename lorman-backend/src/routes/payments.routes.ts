import { Router } from "express";
import Stripe from "stripe";
import express from "express";
import UserRepository from "../repositories/users.repository";
import CarritoRepository from "../repositories/car.repository";
import { createOrder } from "../repositories/orders.repository";
import { sendPurchaseEmails, PurchaseEmailData } from "../utils/mail";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing required environment variable: STRIPE_SECRET_KEY");
}
if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("Missing required environment variable: STRIPE_WEBHOOK_SECRET");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const paymentsRoutes = Router();

paymentsRoutes.post("/webhook", express.raw({ type: 'application/json' }), async (request, response) => {
    let event = request.body;
    if (endpointSecret) {
        const signature = request.headers['stripe-signature'] as string;
        try {
            event = stripe.webhooks.constructEvent(
                request.body,
                signature,
                endpointSecret
            );
        } catch (err: any) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            return response.sendStatus(400);
        }
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
            break;
            
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log(`Checkout session for ${session.amount_total} was successful!`);
            console.log('Webhook event data:', session.customer_details?.email, session.amount_total, session.metadata?.user);
            
            try {
                const userEmail = session.metadata?.user;
                if (!userEmail) {
                    console.error('No se encontró el email del usuario en metadata');
                    break;
                }

                const user = await UserRepository.findByEmail(userEmail);
                if (!user) {
                    console.error('Usuario no encontrado:', userEmail);
                    break;
                }

                // Obtener items del carrito usando la nueva función
                const carritoItems = await CarritoRepository.getCarritoByCliente(user.id_usuario);
                
                if (!carritoItems || carritoItems.length === 0) {
                    console.error('Carrito vacío para usuario:', user.id_usuario);
                    break;
                }

                console.log(`Procesando ${carritoItems.length} productos del carrito`);

                // Crear el pedido en la base de datos
                const orderData = {
                    id_cliente: user.id_usuario,
                    direccion_entrega: session.customer_details?.address?.line1 || 'Dirección no especificada',
                    items: carritoItems.map(item => ({
                        id_producto: item.id_producto,
                        cantidad: item.cantidad,
                        precio_al_momento: item.productos?.precio_unitario || 0,
                        id_promocion_aplicada: undefined,
                    })),
                };

                const { order, details } = await createOrder(orderData);
                console.log('✅ Pedido creado exitosamente:', order.id_pedido);

                // Preparar datos para el email
                const purchaseEmailData: PurchaseEmailData = {
                    customerEmail: user.email,
                    customerName: user.nombre_completo,
                    orderId: order.id_pedido.toString(),
                    items: carritoItems.map(item => ({
                        name: item.productos?.nombre_producto || 'Producto',
                        quantity: item.cantidad,
                        price: item.productos?.precio_unitario || 0,
                        subtotal: item.cantidad * (item.productos?.precio_unitario || 0),
                    })),
                    total: order.monto_total,
                    purchaseDate: new Date().toLocaleString('es-MX', {
                        dateStyle: 'full',
                        timeStyle: 'short',
                    }),
                    deliveryAddress: orderData.direccion_entrega,
                };

                // Enviar emails (no bloquear si falla)
                sendPurchaseEmails(purchaseEmailData)
                    .then(() => console.log('✅ Emails enviados correctamente'))
                    .catch(emailError => {
                        console.error('❌ Error al enviar emails (no crítico):', emailError);
                    });

                // Limpiar carrito después de crear el pedido
                await CarritoRepository.clearCarritoByCliente(user.id_usuario);
                console.log('✅ Carrito limpiado para usuario:', user.id_usuario);

            } catch (error) {
                console.error('❌ Error procesando checkout completado:', error);
                // No devolver error 500 para no afectar el webhook de Stripe
            }
            break;
            
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            break;
            
        default:
            console.log(`Unhandled event type ${event.type}.`);
    }

    response.send();
});

export default paymentsRoutes;