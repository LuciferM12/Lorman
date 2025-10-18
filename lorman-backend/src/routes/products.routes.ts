import { Router } from "express";
import ProductController from "../controllers/products.controller";

const productRoutes = Router();

productRoutes.post("/", ProductController.createProduct);
productRoutes.get("/", ProductController.getAll);
productRoutes.put("/:id_producto", ProductController.updateProduct);
productRoutes.delete("/:id_producto", ProductController.deleteProduct);

export default productRoutes;