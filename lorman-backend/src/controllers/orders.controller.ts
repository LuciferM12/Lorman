import { Request, Response } from "express";

import { z } from "zod";
import OrderService from "../services/order.service";
import { CreateOrderData } from "../repositories/orders.repository";

const createOrderSchema = z.object({
  id_cliente: z.number().positive(),
  metodo_pago: z.string().min(1),
  direccion_entrega: z.string().min(1),
  total: z.number().positive(),
  items: z.array(
    z.object({
      id_producto: z.number().positive(),
      cantidad: z.number().positive(),
      precio_al_momento: z.number().positive(), // ⬅️ Cambio aquí
      id_promocion_aplicada: z.number().positive().optional(), // ⬅️ Agregado
    })
  ),
}) satisfies z.ZodType<CreateOrderData>;

const updateStatusSchema = z.object({
  estado_entrega: z.enum(["pendiente", "en_camino", "entregado", "cancelado"]),
});

const OrderController = {
  /**
   * 🆕 Crear un pedido con sus detalles
   */
  async createOrder(req: Request, res: Response) {
    try {
      const parsed = createOrderSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: "Datos inválidos",
          details: parsed.error.flatten().fieldErrors,
        });
      }

      const newOrder = await OrderService.createOrder(parsed.data);
      return res.status(201).json({
        message: "Pedido creado exitosamente",
        order: newOrder,
      });
    } catch (error: any) {
      console.error("Error en createOrder:", error);
      return res.status(400).json({ message: error.message });
    }
  },

  /**
   * 🔍 Obtener todos los pedidos (modo administrador)
   */
  async getAll(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string, 10) || 50;
      const offset = parseInt(req.query.offset as string, 10) || 0;

      const { orders, total } = await OrderService.getAllOrders(limit, offset);
      return res.status(200).json({ total, orders });
    } catch (error: any) {
      console.error("Error en getAll:", error);
      return res.status(400).json({ message: error.message });
    }
  },

  /**
   * 🧾 Obtener un pedido por ID
   */
  async getById(req: Request, res: Response) {
    try {
      const id_pedido = parseInt(req.params.id_pedido, 10);
      if (isNaN(id_pedido) || id_pedido <= 0) {
        return res
          .status(400)
          .json({ error: "El ID del pedido debe ser un entero positivo" });
      }

      const order = await OrderService.getOrderById(id_pedido);
      return res.status(200).json({ order });
    } catch (error: any) {
      console.error("Error en getById:", error);
      return res.status(400).json({ message: error.message });
    }
  },

  /**
   * 👤 Obtener pedidos por cliente
   */
  async getByClient(req: Request, res: Response) {
    try {
      const id_cliente = parseInt(req.params.id_cliente, 10);
      if (isNaN(id_cliente) || id_cliente <= 0) {
        return res
          .status(400)
          .json({ error: "El ID del cliente debe ser un entero positivo" });
      }

      const orders = await OrderService.getOrdersByClient(id_cliente);
      return res.status(200).json({ orders });
    } catch (error: any) {
      console.error("Error en getByClient:", error);
      return res.status(400).json({ message: error.message });
    }
  },

  /**
   * 🔄 Actualizar estado de entrega del pedido
   */
  async updateStatus(req: Request, res: Response) {
    try {
      const id_pedido = parseInt(req.params.id_pedido, 10);
      if (isNaN(id_pedido) || id_pedido <= 0) {
        return res
          .status(400)
          .json({ error: "El ID del pedido debe ser un entero positivo" });
      }

      const parsed = updateStatusSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: "Datos inválidos para actualización",
          details: parsed.error.flatten().fieldErrors,
        });
      }

      const updated = await OrderService.updateOrderStatus(
        id_pedido,
        parsed.data.estado_entrega
      );

      return res
        .status(200)
        .json({ message: "Estado actualizado correctamente", pedido: updated });
    } catch (error: any) {
      console.error("Error en updateStatus:", error);
      return res.status(400).json({ message: error.message });
    }
  },

  /**
   * ❌ Cancelar un pedido
   */
  async cancel(req: Request, res: Response) {
    try {
      const id_pedido = parseInt(req.params.id_pedido, 10);
      if (isNaN(id_pedido) || id_pedido <= 0) {
        return res
          .status(400)
          .json({ error: "El ID del pedido debe ser un entero positivo" });
      }

      const canceled = await OrderService.cancelOrder(id_pedido);
      return res
        .status(200)
        .json({ message: "Pedido cancelado correctamente", pedido: canceled });
    } catch (error: any) {
      console.error("Error en cancel:", error);
      return res.status(400).json({ message: error.message });
    }
  },
};

export default OrderController;
