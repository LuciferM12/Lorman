import axios from "axios";
import { API_URL } from "../users";
import { ProductInCartDTO, ProductRegisterDTO } from "@/interfaces/IProduct";

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

export async function updateProduct(productId: number, productData: ProductInCartDTO) {
    try {
        const response = await axios.put(`${API_URL}/products/${productId}`, productData);
        return response.data.product;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
}

export async function createProduct(productData: ProductRegisterDTO) {
    try {
        const response = await axios.post(`${API_URL}/products`, productData);
        return response.data.product;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}

export async function deleteProduct(productId: number) {
    try {
        const response = await axios.delete(`${API_URL}/products/${productId}`);
        return response.data.message;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
}