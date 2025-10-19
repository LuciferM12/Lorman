import { Router } from "express";
import PromotionController from "../controllers/promotions.controller";

const promotionRoutes = Router();

promotionRoutes.post("/", PromotionController.createPromotion);
promotionRoutes.get("/", PromotionController.listPromotions);
promotionRoutes.get("/:id_promocion", PromotionController.getPromotionById);
promotionRoutes.put("/:id_promocion", PromotionController.updatePromotion);
promotionRoutes.delete("/:id_promocion", PromotionController.deletePromotion);

promotionRoutes.post("/link", PromotionController.linkProduct);
promotionRoutes.delete("/:id_promocion/product/:id_producto", PromotionController.unlinkProduct);
promotionRoutes.get("/:id_promocion/products", PromotionController.listProductsByPromotion);

export default promotionRoutes;
