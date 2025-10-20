import { CartItem, DetailCartDTO, ResponseCartDetailDTO } from "@/interfaces/ICart";
import { API_URL } from "../users";
import axios from "axios";
import { ProductAdditionDTO, ProductQuantityUpdatedDTO, productUpdatedSchema } from "@/interfaces/IProduct";


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

export async function getCartDetails(id_usuario: number): Promise<ResponseCartDetailDTO[]> {
    try {
        const response = await axios.get(`${API_URL}/cart/usuario/${id_usuario}`);
        return response.data.details as ResponseCartDetailDTO[];
    } catch (error) {
        console.error("Error fetching cart details:", error);
        throw error;
    }
}

export async function updateCartItemQuantity(id_detalle_carrito: number, cantidad: number): Promise<ProductQuantityUpdatedDTO> {
    try {
        const response = await axios.put(`${API_URL}/cart/detail/${id_detalle_carrito}`, {
            cantidad,
        });
        return productUpdatedSchema.parse(response.data.detalle);
    } catch (error) {
        console.error("Error updating cart item quantity:", error);
        throw error;
    }
}

export async function removeCartItem(id_detalle_carrito: number): Promise<void> {
    try {
        await axios.delete(`${API_URL}/cart/detail/${id_detalle_carrito}`);
    } catch (error) {
        console.error("Error removing cart item:", error);
        throw error;
    }
}

export async function addItemToCart(detailCartDTO: ProductAdditionDTO): Promise<void> {
    try {
        await axios.post(`${API_URL}/cart/add`, detailCartDTO);
    } catch (error) {
        console.error("Error adding item to cart:", error);
        throw error;
    }
}