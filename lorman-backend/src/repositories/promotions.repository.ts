import { supabaseClient } from "../config/supabaseClient";
import { PromotionRegister, PromotionProductLink } from "../interfaces/promotions.interface";

const TABLE_PROMO = "promociones";
const TABLE_PROMO_PRODUCT = "promocion_productos";

const PromotionRepository = {
    async createPromotion(data: PromotionRegister) {
        const { data: inserted, error } = await supabaseClient.from(TABLE_PROMO).insert(data).select().single();
        if (error) throw new Error(`Error creando promoción: ${error.message}`);
        return inserted;
    },

    async listPromotions() {
        const { data, error } = await supabaseClient.from(TABLE_PROMO).select("*").order("id_promocion", { ascending: true });
        if (error) throw new Error(`Error listando promociones: ${error.message}`);
        return data;
    },

    async getPromotionById(id_promocion: number) {
        const { data, error } = await supabaseClient.from(TABLE_PROMO).select("*").eq("id_promocion", id_promocion).single();
        if (error) throw new Error(`Error obteniendo promoción: ${error.message}`);
        return data;
    },

    async updatePromotion(id_promocion: number, data: Partial<PromotionRegister>) {
        const { data: updated, error } = await supabaseClient
            .from(TABLE_PROMO)
            .update(data)
            .eq("id_promocion", id_promocion)
            .select()
            .single();
        if (error) throw new Error(`Error actualizando promoción: ${error.message}`);
        return updated;
    },

    async deletePromotion(id_promocion: number) {
        const { error } = await supabaseClient.from(TABLE_PROMO).delete().eq("id_promocion", id_promocion);
        if (error) throw new Error(`Error eliminando promoción: ${error.message}`);
    },

    async linkPromotionToProduct(data: PromotionProductLink) {
        const { data: inserted, error } = await supabaseClient.from(TABLE_PROMO_PRODUCT).insert(data).select().single();
        if (error) throw new Error(`Error vinculando producto a promoción: ${error.message}`);
        return inserted;
    },

    async unlinkPromotionFromProduct(id_promocion: number, id_producto: number) {
        const { error } = await supabaseClient
            .from(TABLE_PROMO_PRODUCT)
            .delete()
            .match({ id_promocion, id_producto });
        if (error) throw new Error(`Error desvinculando producto: ${error.message}`);
    },

    async listProductsByPromotion(id_promocion: number) {
        const { data, error } = await supabaseClient
            .from(TABLE_PROMO_PRODUCT)
            .select("*")
            .eq("id_promocion", id_promocion);
        if (error) throw new Error(`Error obteniendo productos de promoción: ${error.message}`);
        return data;
    }
};

export default PromotionRepository;
