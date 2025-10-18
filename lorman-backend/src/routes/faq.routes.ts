import { Router } from "express";
import FaqController from "../controllers/faqs.controller";

const faqRoutes = Router();

faqRoutes.post("/", FaqController.createFaq);
faqRoutes.get("/", FaqController.getAll);
faqRoutes.put("/:id_faq", FaqController.updateFaq);
faqRoutes.delete("/:id_faq", FaqController.deleteFaq);
faqRoutes.get("/:id_faq", FaqController.getById);
faqRoutes.patch("/:id_faq/visibility", FaqController.setFaqVisibility);

export default faqRoutes;
