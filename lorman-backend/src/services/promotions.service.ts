import PromotionRepository from "../repositories/promotions.repository";
import { PromotionRegister, PromotionProductLink } from "../interfaces/promotions.interface";

const PromotionService = {
    async createPromotion(data: PromotionRegister) {
        return await PromotionRepository.createPromotion(data);
    },

    async listPromotions() {
        return await PromotionRepository.listPromotions();
    },

    async getPromotionById(id_promocion: number) {
        const promo = await PromotionRepository.getPromotionById(id_promocion);
        if (!promo) throw new Error("Promoción no encontrada");
        return promo;
    },

    async updatePromotion(id_promocion: number, data: Partial<PromotionRegister>) {
        const updated = await PromotionRepository.updatePromotion(id_promocion, data);
        if (!updated) throw new Error("No se pudo actualizar la promoción");
        return updated;
    },

    async deletePromotion(id_promocion: number) {
        await PromotionRepository.deletePromotion(id_promocion);
    },

    async linkProduct(data: PromotionProductLink) {
        return await PromotionRepository.linkPromotionToProduct(data);
    },

    async unlinkProduct(id_promocion: number, id_producto: number) {
        await PromotionRepository.unlinkPromotionFromProduct(id_promocion, id_producto);
    },

    async listProductsByPromotion(id_promocion: number) {
        return await PromotionRepository.listProductsByPromotion(id_promocion);
    }
};

export default PromotionService;
