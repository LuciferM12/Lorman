import { Router } from "express";
import OrderController from "../controllers/orders.controller";

const orderRoutes = Router();

// 🆕 Crear un pedido
orderRoutes.post("/", OrderController.createOrder);

// 🔍 Obtener todos los pedidos (admin)
orderRoutes.get("/", OrderController.getAll);

// 🧾 Obtener un pedido por ID
orderRoutes.get("/:id_pedido", OrderController.getById);

// 👤 Obtener pedidos por cliente
orderRoutes.get("/client/:id_cliente", OrderController.getByClient);

// 🔄 Actualizar estado de entrega
orderRoutes.patch("/:id_pedido/status", OrderController.updateStatus);

// ❌ Cancelar pedido
orderRoutes.patch("/:id_pedido/cancel", OrderController.cancel);

export default orderRoutes;