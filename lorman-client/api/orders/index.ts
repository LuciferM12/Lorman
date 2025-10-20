import axios from "axios";
import { API_URL } from "../users";

export async function getAllOrders(limit = 50, offset = 0): Promise<{ orders: any[]; total: number | null }> {
    const response = await axios.get(`${API_URL}/orders?limit=${limit}&offset=${offset}`);
    return {
        orders: response.data.orders || [],
        total: response.data.total || null,
    };
}

export async function getOrderById(id_pedido: number): Promise<any> {
    const response = await axios.get(`${API_URL}/orders/${id_pedido}`);
    return response.data.order;
}