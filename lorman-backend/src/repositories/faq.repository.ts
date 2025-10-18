import { supabaseClient } from "../config/supabaseClient";
import { FaqDTO, FaqRegisterDTO, faqSchema } from "../interfaces/faq.interface";

const TABLE = "preguntas_frecuentes";

const FaqRepository = {
    async createFAQ(data: FaqRegisterDTO): Promise<FaqDTO> {
        const { data: result, error } = await supabaseClient.from(TABLE).insert([data]).select('*').single();
        if (error) {
            throw new Error(`Error creando la FAQ: ${error.message}`);
        }
        return faqSchema.parse(result);
    },

    async findById(id: number): Promise<FaqDTO | null> {
        const { data, error } = await supabaseClient.from(TABLE).select('*').eq('id_pregunta', id).single();
        if (error) {
            if (error.code === 'PGRST116') { // No rows found
                return null;
            }
            throw new Error(`Error encontrando la FAQ por id: ${error.message}`);
        }
        return faqSchema.parse(data);
    },

    async listFAQs(onlyVisible = true, limit = 100, offset = 0): Promise<FaqDTO[]> {
        let query = supabaseClient.from(TABLE).select('*').range(offset, offset + limit - 1);

        if (onlyVisible) {
            query = query.eq('visible_publicamente', true);
        }

        const { data, error } = await query;

        if (error) {
            throw new Error(`Error listando las FAQs: ${error.message}`);
        }
        return faqSchema.array().parse(data);
    },

    async updateFAQ(id: number, data: Partial<FaqDTO>): Promise<FaqDTO> {
        const { data: result, error } = await supabaseClient.from(TABLE).update(data).eq('id_faq', id).select('*').single();
        if (error) {
            throw new Error(`Error actualizando la FAQ: ${error.message}`);
        }
        return faqSchema.parse(result);
    },

    async setVisibility(id: number, status: boolean): Promise<void> {
        const { error } = await supabaseClient.from(TABLE).update({ visible_publicamente: status }).eq('id_faq', id);
        if (error) {
            throw new Error(`Error actualizando la visibilidad de la FAQ: ${error.message}`);
        }
    },

    async deleteFAQ(id: number): Promise<void> {
        const { error } = await supabaseClient.from(TABLE).delete().eq('id_faq', id);
        if (error) {
            throw new Error(`Error eliminando la FAQ: ${error.message}`);
        }
    }
};

export default FaqRepository;