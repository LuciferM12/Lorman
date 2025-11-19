import { Request, Response } from "express";
import Stripe from "stripe";
import { CartItem } from "../interfaces/items.interface";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:8081';

export const createCheckoutSession = async (req: Request, res: Response) => {
    const session = await stripe.checkout.sessions.create({
        line_items: req.body.items.map((item: CartItem) => ({
            price_data: {
                product_data: {
                    name: item.name,
                    description: item.descripcion,
                    images: [item.imagen],
                },
                currency: 'mxn',
                unit_amount: item.precio * 100,
            },
            quantity: item.cantidad,
        })),
        mode: 'payment',
        metadata: {
            user: req.body.user || '',
        },
        success_url: `${CORS_ORIGIN}/success`,
        cancel_url: `${CORS_ORIGIN}/payments/cancel`,
    })
    return res.json(session)
}

export const createPaymentIntent = async (req: Request, res: Response) => {
    try {
        const { items, user } = req.body;

        // Calcular el monto total
        const amount = items.reduce(
            (sum: number, item: CartItem) => sum + (item.precio * item.cantidad),
            0
        );

        // Crear el Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convertir a centavos
            currency: 'mxn',
            metadata: {
                user: user || '',
                items: JSON.stringify(items.map((item: CartItem) => ({
                    id: item.id,
                    name: item.name,
                    cantidad: item.cantidad,
                    precio: item.precio
                }))),
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Error al crear el intento de pago' });
    }
};