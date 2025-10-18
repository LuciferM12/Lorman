import { Router } from "express";
import ReviewController from "../controllers/reviews.controller";

const reviewRoutes = Router();

reviewRoutes.post("/", ReviewController.createReview);
reviewRoutes.get("/", ReviewController.getAll);
reviewRoutes.get("/:id_resena", ReviewController.getById);

export default reviewRoutes;