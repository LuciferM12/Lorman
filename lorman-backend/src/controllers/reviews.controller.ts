import { Request, Response } from "express";
import { reviewRegisterSchema } from "../interfaces/reviews.interface";
import ReviewService from "../services/reviews.service";

const ReviewController = {
    async createReview(req: Request, res: Response) {
        try {
            const parsed = reviewRegisterSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ error: "Solicitud de datos inválida", details: parsed.error.flatten().fieldErrors })
            }
            const newReview = await ReviewService.createReview(parsed.data);
            res.status(201).json({ message: "Reseña creada exitosamente", review: newReview });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const reviews = await ReviewService.listReviews();
            res.status(200).json({ reviews });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const { id_resena } = req.params;
            const reviewId = parseInt(id_resena, 10);
            if (isNaN(reviewId) || reviewId <= 0) {
                return res.status(400).json({ error: "El ID de la reseña debe ser un entero positivo" });
            }
            const review = await ReviewService.getReviewById(reviewId);
            res.status(200).json({ review });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default ReviewController;