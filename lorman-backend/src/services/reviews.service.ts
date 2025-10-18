import { ReviewDTO, ReviewRegisterDTO } from "../interfaces/reviews.interface";
import ReviewRepository from "../repositories/review.repository";


const ReviewService = {
    async createReview(data: ReviewRegisterDTO): Promise<ReviewDTO> {
        const newReview = await ReviewRepository.createReview(data);
        return newReview;
    },

    async getReviewById(id: number): Promise<ReviewDTO> {
        const review = await ReviewRepository.findById(id);
        if (!review) {
            throw new Error("Reseña no encontrada");
        }
        return review;
    },

    async listReviews(limit = 100, offset = 0): Promise<ReviewDTO[]> {
        const reviews = await ReviewRepository.listReviews(limit, offset);
        if (!reviews || reviews.length === 0) {
            return [];
        }
        return reviews;
    }
}

export default ReviewService;