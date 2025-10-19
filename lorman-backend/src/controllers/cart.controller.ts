import { Request, Response } from "express";
import {
    carritoSchema,
    carDetailSchema
} from "../interfaces/car.interface";
import CarritoService from "../services/car.service";

const CartController = {
    async createCart(req: Request, res: Response) {
        try {
            const parsed = carritoSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({
                    error: "Solicitud de datos inválida",
                    details: parsed.error.flatten().fieldErrors
                });
            }

            const newCart = await CarritoService.createCarrito(parsed.data);
            res.status(201).json({
                message: "Carrito creado exitosamente",
                cart: newCart
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async getCartByCliente(req: Request, res: Response) {
        try {
            if (!req.params.id_cliente) {
                return res.status(400).json({ error: "ID de cliente no proporcionado" });
            }

            const idCliente = parseInt(req.params.id_cliente, 10);
            if (isNaN(idCliente) || idCliente <= 0) {
                return res.status(400).json({ error: "El ID del cliente debe ser un entero positivo" });
            }

            const cart = await CarritoService.getCarritoByCliente(idCliente);
            res.status(200).json({ cart });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async listCartDetails(req: Request, res: Response) {
        try {
            if (!req.params.id_carrito) {
                return res.status(400).json({ error: "ID del carrito no proporcionado" });
            }

            const idCarrito = parseInt(req.params.id_carrito, 10);
            if (isNaN(idCarrito) || idCarrito <= 0) {
                return res.status(400).json({ error: "El ID del carrito debe ser un entero positivo" });
            }

            const details = await CarritoService.listCarritoDetails(idCarrito);
            res.status(200).json({ detalles: details });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async addProduct(req: Request, res: Response) {
        try {
            const parsed = carDetailSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({
                    error: "Solicitud de datos inválida",
                    details: parsed.error.flatten().fieldErrors
                });
            }

            const newDetail = await CarritoService.addProductToCarrito(parsed.data);
            res.status(201).json({
                message: "Producto agregado exitosamente al carrito",
                detalle: newDetail
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async updateProductQuantity(req: Request, res: Response) {
        try {
            if (!req.params.id_detalle_carrito) {
                return res.status(400).json({ error: "ID del detalle no proporcionado" });
            }

            const idDetalle = parseInt(req.params.id_detalle_carrito, 10);
            if (isNaN(idDetalle) || idDetalle <= 0) {
                return res.status(400).json({ error: "El ID del detalle debe ser un entero positivo" });
            }

            const { cantidad } = req.body;
            if (typeof cantidad !== "number" || cantidad <= 0) {
                return res.status(400).json({ error: "La cantidad debe ser un número positivo" });
            }

            const updatedDetail = await CarritoService.updateProductQuantity(idDetalle, cantidad);
            res.status(200).json({
                message: "Cantidad actualizada exitosamente",
                detalle: updatedDetail
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async removeProduct(req: Request, res: Response) {
        try {
            if (!req.params.id_detalle_carrito) {
                return res.status(400).json({ error: "ID del detalle no proporcionado" });
            }

            const idDetalle = parseInt(req.params.id_detalle_carrito, 10);
            if (isNaN(idDetalle) || idDetalle <= 0) {
                return res.status(400).json({ error: "El ID del detalle debe ser un entero positivo" });
            }

            await CarritoService.removeProductFromCarrito(idDetalle);
            res.status(200).json({ message: "Producto eliminado exitosamente del carrito" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async clearCart(req: Request, res: Response) {
        try {
            if (!req.params.id_carrito) {
                return res.status(400).json({ error: "ID del carrito no proporcionado" });
            }

            const idCarrito = parseInt(req.params.id_carrito, 10);
            if (isNaN(idCarrito) || idCarrito <= 0) {
                return res.status(400).json({ error: "El ID del carrito debe ser un entero positivo" });
            }

            await CarritoService.clearCarrito(idCarrito);
            res.status(200).json({ message: "Carrito vaciado exitosamente" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
};

export default CartController;
