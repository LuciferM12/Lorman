import { Router } from "express";
import CartController from "../controllers/cart.controller";

const cartRoutes = Router();

// Crear un carrito (o crear uno nuevo para un cliente)
cartRoutes.post("/", CartController.createCart);

// Obtener carrito por ID de cliente
cartRoutes.get("/cliente/:id_cliente", CartController.getCartByCliente);

// Listar detalles del carrito por ID de carrito
cartRoutes.get("/:id_carrito/details", CartController.listCartDetails);

// Agregar un producto al carrito
cartRoutes.post("/add", CartController.addProduct);

// Actualizar cantidad de un detalle del carrito
cartRoutes.put("/detail/:id_detalle_carrito", CartController.updateProductQuantity);

// Eliminar un producto del carrito
cartRoutes.delete("/detail/:id_detalle_carrito", CartController.removeProduct);

// Vaciar completamente el carrito
cartRoutes.delete("/clear/:id_carrito", CartController.clearCart);

export default cartRoutes;
