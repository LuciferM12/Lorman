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

async function processPurchase(userEmail: string, amountTotal: number, metadata?: any) {
    try {
        if (!userEmail) {
            console.error('❌ No se encontró el email del usuario');
            return;
        }

        const user = await UserRepository.findByEmail(userEmail);
        if (!user) {
            console.error('❌ Usuario no encontrado:', userEmail);
            return;
        }

        const carritoItems = await CarritoRepository.getCarritoByCliente(user.id_usuario);
        
        if (!carritoItems || carritoItems.length === 0) {
            console.error('❌ Carrito vacío para usuario:', user.id_usuario);
            return;
        }

        console.log(`📦 Procesando ${carritoItems.length} productos del carrito`);

        const orderData = {
            id_cliente: user.id_usuario,
            direccion_entrega: metadata?.address || 'Dirección pendiente de confirmación',
            items: carritoItems.map(item => ({
                id_producto: item.id_producto,
                cantidad: item.cantidad,
                precio_al_momento: item.productos?.precio_unitario || 0,
                id_promocion_aplicada: undefined,
            })),
        };

        const { order, details } = await createOrder(orderData);
        console.log('✅ Pedido creado exitosamente:', order.id_pedido);

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

        sendPurchaseEmails(purchaseEmailData)
            .then(() => console.log('✅ Emails enviados correctamente'))
            .catch(emailError => {
                console.error('⚠️ Error al enviar emails (no crítico):', emailError);
            });

        await CarritoRepository.clearCarritoByCliente(user.id_usuario);
        console.log('✅ Carrito limpiado para usuario:', user.id_usuario);

    } catch (error) {
        console.error('❌ Error procesando compra:', error);
    }
}

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
            console.log(`⚠️ Webhook signature verification failed:`, err.message);
            return response.sendStatus(400);
        }
    }

    console.log(`🔔 Webhook recibido: ${event.type}`);

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log(`💰 PaymentIntent por $${paymentIntent.amount / 100} fue exitoso!`);
            

            const userEmailFromPI = paymentIntent.metadata?.user;
            if (userEmailFromPI) {
                await processPurchase(
                    userEmailFromPI,
                    paymentIntent.amount,
                    paymentIntent.metadata
                );
            } else {
                console.error('❌ No se encontró metadata.user en PaymentIntent');
            }
            break;
            
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session;
            console.log(`💰 Checkout session por $${session.amount_total! / 100} fue exitoso!`);
            
            const userEmailFromSession = session.metadata?.user || session.customer_details?.email;
            if (userEmailFromSession) {
                await processPurchase(
                    userEmailFromSession,
                    session.amount_total || 0,
                    {
                        address: session.customer_details?.address?.line1,
                        ...session.metadata
                    }
                );
            } else {
                console.error('❌ No se encontró email en la sesión');
            }
            break;
            
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            console.log('💳 Método de pago adjuntado:', paymentMethod.id);
            break;
            
        default:
            console.log(`ℹ️ Evento no manejado: ${event.type}`);
    }

    response.status(200).send({ received: true });
});

export default paymentsRoutes;