import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

export const createCheckoutSession = async (req: Request, res: Response) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    product_data: {
                        name: 'Lorman Product',
                        description: 'Description of Lorman Product',
                    },
                    currency: 'usd',
                    unit_amount: 2000,
                },
                quantity: 1,
            },
            {
                price_data: {
                    product_data: {
                        name: 'Lorman Product 2',
                        description: 'Description of Lorman Product 2',
                    },
                    currency: 'usd',
                    unit_amount: 1000,
                },
                quantity: 2,
            },

        ],
        mode: 'payment',
        success_url: 'http://localhost:8081/payments/success',
        cancel_url: 'http://localhost:8081/payments/cancel',
    })
    return res.json(session)
}
