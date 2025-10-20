import { supabaseClient } from '../config/supabaseClient';

export interface CreateOrderData {
    id_cliente: number;
    direccion_entrega: string;
    items: Array<{
        id_producto: number;
        cantidad: number;
        precio_al_momento: number;
        id_promocion_aplicada?: number;
    }>;
}

export interface OrderResponse {
    id_pedido: number;
    id_cliente: number;
    fecha_pedido: string;
    direccion_entrega: string;
    monto_total: number;
    estado_entrega: string;
}

export interface OrderDetailResponse {
    id_detalle_pedido: number;
    id_pedido: number;
    id_producto: number;
    cantidad: number;
    precio_al_momento: number;
    id_promocion_aplicada: number | null;
}

/**
 * Crea un nuevo pedido con sus detalles
 * @param orderData Datos del pedido y sus items
 * @returns Pedido creado con sus detalles
 */
export const createOrder = async (orderData: CreateOrderData): Promise<{
    order: OrderResponse;
    details: OrderDetailResponse[];
}> => {
    try {
        // 1. Crear el pedido principal
        const { data: orderCreated, error: orderError } = await supabaseClient
            .from('pedidos')
            .insert({
                id_cliente: orderData.id_cliente,
                direccion_entrega: orderData.direccion_entrega,
                estado_entrega: 'pendiente',
                monto_total: 0, // Se actualizará con el trigger
            })
            .select()
            .single();

        if (orderError) {
            console.error('Error al crear pedido:', orderError);
            throw new Error(`Error al crear pedido: ${orderError.message}`);
        }

        if (!orderCreated) {
            throw new Error('No se pudo crear el pedido');
        }

        // 2. Crear los detalles del pedido
        const orderDetailsToInsert = orderData.items.map((item) => ({
            id_pedido: orderCreated.id_pedido,
            id_producto: item.id_producto,
            cantidad: item.cantidad,
            precio_al_momento: item.precio_al_momento,
            id_promocion_aplicada: item.id_promocion_aplicada || null,
        }));

        const { data: detailsCreated, error: detailsError } = await supabaseClient
            .from('detalles_pedido')
            .insert(orderDetailsToInsert)
            .select();

        if (detailsError) {
            console.error('Error al crear detalles del pedido:', detailsError);
            // Rollback: eliminar el pedido creado
            await supabaseClient
                .from('pedidos')
                .delete()
                .eq('id_pedido', orderCreated.id_pedido);
            throw new Error(`Error al crear detalles del pedido: ${detailsError.message}`);
        }

        // 3. Obtener el pedido actualizado con el monto_total calculado por el trigger
        const { data: finalOrder, error: finalOrderError } = await supabaseClient
            .from('pedidos')
            .select('*')
            .eq('id_pedido', orderCreated.id_pedido)
            .single();

        if (finalOrderError) {
            console.error('Error al obtener pedido final:', finalOrderError);
            throw new Error(`Error al obtener pedido final: ${finalOrderError.message}`);
        }

        return {
            order: finalOrder as OrderResponse,
            details: detailsCreated as OrderDetailResponse[],
        };
    } catch (error) {
        console.error('Error en createOrder:', error);
        throw error;
    }
};

/**
 * Obtiene un pedido por ID con sus detalles y productos
 * @param id_pedido ID del pedido
 * @returns Pedido completo con detalles y productos
 */
export const getOrderById = async (id_pedido: number) => {
    try {
        const { data: order, error: orderError } = await supabaseClient
            .from('pedidos')
            .select(`
                *,
                usuarios:id_cliente (
                    id_usuario,
                    nombre_completo,
                    email,
                    telefono
                ),
                detalles_pedido (
                    *,
                    productos:id_producto (
                        id_producto,
                        nombre_producto,
                        descripcion
                    ),
                    promociones:id_promocion_aplicada (
                        id_promocion,
                        nombre_promocion,
                        tipo_descuento,
                        valor_descuento
                    )
                )
            `)
            .eq('id_pedido', id_pedido)
            .single();

        if (orderError) {
            console.error('Error al obtener pedido:', orderError);
            throw new Error(`Error al obtener pedido: ${orderError.message}`);
        }

        return order;
    } catch (error) {
        console.error('Error en getOrderById:', error);
        throw error;
    }
};

/**
 * Obtiene todos los pedidos de un cliente
 * @param id_cliente ID del cliente
 * @returns Lista de pedidos del cliente
 */
export const getOrdersByClient = async (id_cliente: number) => {
    try {
        const { data: orders, error } = await supabaseClient
            .from('pedidos')
            .select(`
                *,
                detalles_pedido (
                    cantidad,
                    precio_al_momento,
                    productos:id_producto (
                        nombre_producto
                    )
                )
            `)
            .eq('id_cliente', id_cliente)
            .order('fecha_pedido', { ascending: false });

        if (error) {
            console.error('Error al obtener pedidos del cliente:', error);
            throw new Error(`Error al obtener pedidos: ${error.message}`);
        }

        return orders;
    } catch (error) {
        console.error('Error en getOrdersByClient:', error);
        throw error;
    }
};

/**
 * Actualiza el estado de entrega de un pedido
 * @param id_pedido ID del pedido
 * @param estado_entrega Nuevo estado
 * @returns Pedido actualizado
 */
export const updateOrderStatus = async (
    id_pedido: number,
    estado_entrega: 'pendiente' | 'en_camino' | 'entregado' | 'cancelado'
) => {
    try {
        const { data, error } = await supabaseClient
            .from('pedidos')
            .update({ estado_entrega })
            .eq('id_pedido', id_pedido)
            .select()
            .single();

        if (error) {
            console.error('Error al actualizar estado del pedido:', error);
            throw new Error(`Error al actualizar estado: ${error.message}`);
        }

        return data;
    } catch (error) {
        console.error('Error en updateOrderStatus:', error);
        throw error;
    }
};

/**
 * Obtiene todos los pedidos (para admin)
 * @param limit Límite de resultados
 * @param offset Offset para paginación
 * @returns Lista de pedidos
 */
export const getAllOrders = async (limit = 50, offset = 0) => {
    try {
        const { data, error, count } = await supabaseClient
            .from('pedidos')
            .select(`
                *,
                usuarios:id_cliente (
                    nombre_completo,
                    email,
                    telefono
                ),
                detalles_pedido (
                    cantidad,
                    precio_al_momento,
                    productos:id_producto (
                        nombre_producto
                    )
                )
            `, { count: 'exact' })
            .order('fecha_pedido', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            console.error('Error al obtener todos los pedidos:', error);
            throw new Error(`Error al obtener pedidos: ${error.message}`);
        }

        return { orders: data, total: count };
    } catch (error) {
        console.error('Error en getAllOrders:', error);
        throw error;
    }
};

/**
 * Cancela un pedido (solo si está en estado pendiente)
 * @param id_pedido ID del pedido
 * @returns Pedido cancelado
 */
export const cancelOrder = async (id_pedido: number) => {
    try {
        // Verificar que el pedido esté en estado pendiente
        const { data: currentOrder, error: checkError } = await supabaseClient
            .from('pedidos')
            .select('estado_entrega')
            .eq('id_pedido', id_pedido)
            .single();

        if (checkError) {
            throw new Error(`Error al verificar pedido: ${checkError.message}`);
        }

        if (currentOrder.estado_entrega !== 'pendiente') {
            throw new Error('Solo se pueden cancelar pedidos en estado pendiente');
        }

        // Actualizar estado a cancelado
        const { data, error } = await supabaseClient
            .from('pedidos')
            .update({ estado_entrega: 'cancelado' })
            .eq('id_pedido', id_pedido)
            .select()
            .single();

        if (error) {
            throw new Error(`Error al cancelar pedido: ${error.message}`);
        }

        return data;
    } catch (error) {
        console.error('Error en cancelOrder:', error);
        throw error;
    }
};