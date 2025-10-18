import { supabaseClient } from "../config/supabaseClient";
import { ReviewDTO, ReviewRegisterDTO, reviewSchema } from "../interfaces/reviews.interface";

const TABLE = "resenas";

const ReviewRepository = {
    async createReview(data: ReviewRegisterDTO): Promise<ReviewDTO> {
        const { data: result, error } = await supabaseClient.from(TABLE).insert([data]).select('*').single();
        if (error) {
            throw new Error(`Error creando la reseña: ${error.message}`);
        }
        return reviewSchema.parse(result);
    },

    async findById(id: number): Promise<ReviewDTO | null> {
        const { data, error } = await supabaseClient.from(TABLE).select('*').eq('id_resena', id).single();
        if (error) {
            if (error.code === 'PGRST116') { // No rows found
                return null;
            }
            throw new Error(`Error encontrando la reseña por id: ${error.message}`);
        }
        return reviewSchema.parse(data);
    },

    async listReviews(limit = 100, offset = 0): Promise<ReviewDTO[]> {
        const { data, error } = await supabaseClient.from(TABLE).select('*').range(offset, offset + limit - 1);
        if (error) {
            throw new Error(`Error listando las reseñas: ${error.message}`);
        }
        return reviewSchema.array().parse(data);
    }

}

export default ReviewRepository;