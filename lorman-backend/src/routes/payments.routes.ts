import { Router } from "express";
import { createCheckoutSession } from "../controllers/payment.controller";
import Stripe from "stripe";
import express from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

const paymentsRoutes = Router();

paymentsRoutes.post("/webhook",express.raw({type: 'application/json'}), (request, response) => {
    let event = request.body;
    if (endpointSecret) {
        // Get the signature sent by Stripe
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
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log(`Checkout session for ${session.amount_total} was successful!`);
            console.log('Webhook event data:', session.customer_details.email, session.amount_total, session.metadata);
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
        default:
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}.`);
    }

    response.send();
});


export default paymentsRoutes;