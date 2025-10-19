import { CartItem } from "@/interfaces/ICart";
import { API_URL } from "../users";
import axios from "axios";


export async function createCheckoutSession(cartItems: CartItem[], user: string) {
    try {
        const response = await axios.post(`${API_URL}/create-checkout-session`, {
            items: cartItems,
            user
        });
        return response.data;
    } catch (error) {
        console.error("Error creating checkout session:", error);
        throw error;
    }
}