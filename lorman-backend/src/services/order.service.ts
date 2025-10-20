import {
    createOrder,
    getOrderById,
    getOrdersByClient,
    getAllOrders,
    updateOrderStatus,
    cancelOrder,
    CreateOrderData,
    OrderResponse,
    OrderDetailResponse,
} from "../repositories/orders.repository";

import {
    GetOrderByIdResponse,
    PedidoBase,
} from "../interfaces/orders.interface";

/**
 * Servicio de pedidos: encapsula la lógica de negocio sobre los repositorios
 */
const OrderService = {
    /**
     * Crea un nuevo pedido y sus detalles.
     * @param data Datos del pedido y sus productos
     * @returns Pedido creado junto con sus detalles
     */
    async createOrder(data: CreateOrderData): Promise<{
        order: OrderResponse;
        details: OrderDetailResponse[];
    }> {
        const newOrder = await createOrder(data);
        return newOrder;
    },

    /**
     * Obtiene un pedido completo por su ID (con usuario, productos y promociones).
     * @param id ID del pedido
     * @returns Pedido completo
     */
    async getOrderById(id: number): Promise<GetOrderByIdResponse> {
        const order = await getOrderById(id);
        if (!order) throw new Error("Pedido no encontrado");
        return order as GetOrderByIdResponse;
    },

    /**
     * Obtiene todos los pedidos realizados por un cliente.
     * @param id_cliente ID del cliente
     * @returns Lista de pedidos del cliente
     */
    async getOrdersByClient(id_cliente: number): Promise<PedidoBase[]> {
        const orders = await getOrdersByClient(id_cliente);
        return orders as PedidoBase[];
    },

    /**
     * Obtiene todos los pedidos para el panel administrativo.
     * @param limit Límite de resultados
     * @param offset Offset de paginación
     * @returns Lista de pedidos y el total
     */
    async getAllOrders(
        limit = 50,
        offset = 0
    ): Promise<{ orders: PedidoBase[]; total: number | null }> {
        const { orders, total } = await getAllOrders(limit, offset);
        return { orders: orders as PedidoBase[], total };
    },

    /**
     * Actualiza el estado de entrega de un pedido.
     * @param id_pedido ID del pedido
     * @param estado_entrega Nuevo estado
     * @returns Pedido actualizado
     */
    async updateOrderStatus(
        id_pedido: number,
        estado_entrega: "pendiente" | "en_camino" | "entregado" | "cancelado"
    ): Promise<PedidoBase> {
        const updatedOrder = await updateOrderStatus(id_pedido, estado_entrega);
        return updatedOrder as PedidoBase;
    },

    /**
     * Cancela un pedido (solo si está en estado pendiente).
     * @param id_pedido ID del pedido
     * @returns Pedido cancelado
     */
    async cancelOrder(id_pedido: number): Promise<PedidoBase> {
        const canceledOrder = await cancelOrder(id_pedido);
        return canceledOrder as PedidoBase;
    },
};

export default OrderService;
