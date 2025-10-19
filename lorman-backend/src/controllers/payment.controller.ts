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
        success_url: `${CORS_ORIGIN}/payments/success`,
        cancel_url: `${CORS_ORIGIN}/payments/cancel`,
    })
    return res.json(session)
}