

export interface GetOrderByIdResponse {
    id_pedido: number;
    id_cliente: number;
    fecha_pedido: string; // ISO string (ej. "2025-10-19T14:23:00Z")
    total: number;
    estado_entrega: 'pendiente' | 'en_camino' | 'entregado' | 'cancelado';
    metodo_pago: string | null;
    direccion_envio: string | null;
    created_at: string;
    updated_at: string | null;

    usuarios: {
        id_usuario: number;
        nombre_completo: string;
        email: string;
        telefono: string | null;
    } | null;

    detalles_pedido: {
        id_detalle_pedido: number;
        id_pedido: number;
        id_producto: number;
        id_promocion_aplicada: number | null;
        cantidad: number;
        precio_unitario: number;
        subtotal: number;

        productos: {
            id_producto: number;
            nombre_producto: string;
            descripcion: string | null;
        } | null;

        promociones: {
            id_promocion: number;
            nombre_promocion: string;
            tipo_descuento: 'porcentaje' | 'monto_fijo';
            valor_descuento: number;
        } | null;
    }[];
}

export type EstadoEntrega = 'pendiente' | 'en_camino' | 'entregado' | 'cancelado';

export interface UsuarioCliente {
    nombre_completo: string;
    email: string;
    telefono: string | null;
}

export interface ProductoPedido {
    nombre_producto: string;
}

export interface DetallePedidoSimple {
    cantidad: number;
    precio_al_momento: number;
    productos: ProductoPedido | null;
}

// Tipo completo del pedido
export interface PedidoBase {
    id_pedido: number;
    id_cliente: number;
    fecha_pedido: string; // ISO string
    total: number;
    estado_entrega: EstadoEntrega;
    metodo_pago: string | null;
    direccion_envio: string | null;
    created_at: string;
    updated_at: string | null;
}