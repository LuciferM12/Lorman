import axios from "axios";
import { API_URL } from "../users";

export async function getProducts() {
    try {
        const response = await axios.get(`${API_URL}/products`);
        console.log('Respuesta de productos:', response.data);
        return response.data.products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}