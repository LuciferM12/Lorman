import { Request, Response } from "express";
import Stripe from "stripe";
import { CartItem } from "../interfaces/items.interface";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

export const createCheckoutSession = async (req: Request, res: Response) => {
    console.log('Creating checkout session with items:', req.body);
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
            items: JSON.stringify(req.body.items),
        },
        success_url: 'http://localhost:8081/payments/success',
        cancel_url: 'http://localhost:8081/payments/cancel',
    })
    return res.json(session)
}