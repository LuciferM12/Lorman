import { Router } from "express";
import ProductController from "../controllers/products.controller";
import multer from "multer"
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage, limits: {
        fieldSize: 25 * 1024 * 1024, // 25 MB
        fieldNameSize: 200, // 200 bytes
        fileSize: 50 * 1024 * 1024, // 50 MB
    }
})

const productRoutes = Router();

productRoutes.post("/", upload.single('imagen'), ProductController.createProduct);
productRoutes.get("/", ProductController.getAll);
productRoutes.put("/:id_producto", upload.single('imagen'), ProductController.updateProduct);
productRoutes.delete("/:id_producto", ProductController.deleteProduct);

export default productRoutes;