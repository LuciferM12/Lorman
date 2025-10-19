import { Request, Response } from "express";
import { promotionRegisterSchema, promotionProductLinkSchema } from "../interfaces/promotions.interface";
import PromotionService from "../services/promotions.service";

const PromotionController = {
    async createPromotion(req: Request, res: Response) {
        try {
            const parsed = promotionRegisterSchema.safeParse(req.body);
            if (!parsed.success)
                return res.status(400).json({ error: "Datos inválidos", details: parsed.error.flatten().fieldErrors });

            const promo = await PromotionService.createPromotion(parsed.data);
            res.status(201).json({ message: "Promoción creada exitosamente", promotion: promo });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async listPromotions(req: Request, res: Response) {
        try {
            const promos = await PromotionService.listPromotions();
            res.status(200).json({ promotions: promos });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async getPromotionById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id_promocion, 10);
            if (isNaN(id) || id <= 0)
                return res.status(400).json({ error: "ID de promoción inválido" });

            const promo = await PromotionService.getPromotionById(id);
            res.status(200).json({ promotion: promo });
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    },

    async updatePromotion(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id_promocion, 10);
            if (isNaN(id) || id <= 0)
                return res.status(400).json({ error: "ID de promoción inválido" });

            const parsed = promotionRegisterSchema.partial().safeParse(req.body);
            if (!parsed.success)
                return res.status(400).json({ error: "Datos inválidos", details: parsed.error.flatten().fieldErrors });

            const updated = await PromotionService.updatePromotion(id, parsed.data);
            res.status(200).json({ message: "Promoción actualizada exitosamente", promotion: updated });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async deletePromotion(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id_promocion, 10);
            if (isNaN(id) || id <= 0)
                return res.status(400).json({ error: "ID de promoción inválido" });

            await PromotionService.deletePromotion(id);
            res.status(200).json({ message: "Promoción eliminada exitosamente" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async linkProduct(req: Request, res: Response) {
        try {
            const parsed = promotionProductLinkSchema.safeParse(req.body);
            if (!parsed.success)
                return res.status(400).json({ error: "Datos inválidos", details: parsed.error.flatten().fieldErrors });

            const link = await PromotionService.linkProduct(parsed.data);
            res.status(201).json({ message: "Producto vinculado correctamente", link });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async unlinkProduct(req: Request, res: Response) {
        try {
            const id_promocion = parseInt(req.params.id_promocion, 10);
            const id_producto = parseInt(req.params.id_producto, 10);

            if (isNaN(id_promocion) || id_promocion <= 0 || isNaN(id_producto) || id_producto <= 0)
                return res.status(400).json({ error: "IDs inválidos" });

            await PromotionService.unlinkProduct(id_promocion, id_producto);
            res.status(200).json({ message: "Producto desvinculado correctamente" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async listProductsByPromotion(req: Request, res: Response) {
        try {
            const id_promocion = parseInt(req.params.id_promocion, 10);
            if (isNaN(id_promocion) || id_promocion <= 0)
                return res.status(400).json({ error: "ID de promoción inválido" });

            const products = await PromotionService.listProductsByPromotion(id_promocion);
            res.status(200).json({ products });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
};

export default PromotionController;
