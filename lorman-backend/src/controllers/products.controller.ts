import { Request, Response } from "express";
import { productRegisterSchema, ProductSchema } from "../interfaces/products.interface";
import ProductService from "../services/products.service";

const ProductController = {
    async createProduct(req: Request, res: Response) {
        try {
            const parsed = productRegisterSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ error: "Solicitud de datos inválida", details: parsed.error.flatten().fieldErrors })
            }

            const newProduct = await ProductService.createProduct(parsed.data);
            res.status(201).json({ message: "Producto creado exitosamente", product: newProduct });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const products = await ProductService.listProducts();
            res.status(200).json({ products });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async updateProduct(req: Request, res: Response) {
        try {
            if (!req.params.id_producto) {
                return res.status(400).json({ error: "El ID del producto es requerido" });
            }
            const productId = parseInt(req.params.id_producto, 10);
            if (isNaN(productId) || productId <= 0) {
                return res.status(400).json({ error: "El ID del producto debe ser un entero positivo" });
            }
            const updatedData = { ...req.body, id_producto: productId };
            const parsed = ProductSchema.safeParse(updatedData);
            if (!parsed.success) {
                return res.status(400).json({ error: "Solicitud de datos inválida", details: parsed.error.flatten().fieldErrors })
            }
            const updatedProduct = await ProductService.updateProduct(productId, parsed.data);
            res.status(200).json({ message: "Producto actualizado exitosamente", product: updatedProduct });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async deleteProduct(req: Request, res: Response) {
        try {
            if (!req.params.id_producto) {
                return res.status(400).json({ error: "El ID del producto es requerido" });
            }
            const productId = parseInt(req.params.id_producto, 10);
            if (isNaN(productId) || productId <= 0) {
                return res.status(400).json({ error: "El ID del producto debe ser un entero positivo" });
            }
            await ProductService.deleteProduct(productId);
            res.status(200).json({ message: "Producto eliminado exitosamente" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default ProductController;