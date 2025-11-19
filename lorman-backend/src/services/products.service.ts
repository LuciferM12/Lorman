import { supabaseClient } from "../config/supabaseClient";
import { ProductDTO, ProductRegisterDTO } from "../interfaces/products.interface";
import ProductRepository from "../repositories/products.repository";
import bucketName from "../utils/bucket";

const ProductService = {
    async createProduct(data: ProductRegisterDTO, imageFile?: Express.Multer.File): Promise<ProductDTO> {
        const newProduct = await ProductRepository.create(data);
        if (imageFile) {
            const path = `products/${newProduct.id_producto}/${imageFile.originalname}`;
            const { error } = await supabaseClient.storage.from(bucketName).upload(path, imageFile.buffer, {
                contentType: imageFile.mimetype,
                upsert: true,
            });
            if (error) {
                throw new Error(`Error subiendo la imagen del producto: ${error.message}`);
            }
            console.log("Imagen subida con éxito:", path);
            const updatedProduct = await ProductRepository.update(newProduct.id_producto, { imagen: path });
            return updatedProduct;
        }
        return newProduct;
    },

    async getProductById(id: number): Promise<ProductDTO> {
        const product = await ProductRepository.findById(id);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        if (product.imagen) {
            const { data } = await supabaseClient.storage.from(bucketName).createSignedUrl(product.imagen, 60*60);
            const imageUrl = data?.signedUrl ? data.signedUrl : undefined;
            product.imagen = imageUrl;
        }
        return product;
    },

    async listProducts(limit = 100, offset = 0): Promise<ProductDTO[]> {
        const products = await ProductRepository.list(limit, offset);
        const productsWithUrls = await Promise.all(products.map(async (product) => {
            if (product.imagen) {
                const { data } = await supabaseClient.storage.from(bucketName).createSignedUrl(product.imagen, 60*60);
                const imageUrl = data?.signedUrl ? data.signedUrl : undefined;
                return { ...product, imagen: imageUrl };
            }
            return product;
        }))
        if (!productsWithUrls || productsWithUrls.length === 0) {
            return [];
        }
        return productsWithUrls;
    },

    async updateProduct(id: number, data: Partial<ProductDTO>, imageFile?: Express.Multer.File): Promise<ProductDTO> {
        const product = await ProductRepository.findById(id);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        let updateData = { ...data };
        if (imageFile) {
            const path = `products/${product.id_producto}/${imageFile.originalname}`;
            const { data: uploadData, error } = await supabaseClient.storage.from(bucketName).upload(path, imageFile.buffer, {
                contentType: imageFile.mimetype,
                upsert: true,
            });
            if (error) {
                throw new Error(`Error subiendo la imagen del producto: ${error.message}`);
            }
            updateData.imagen = path;
        }
        const updatedProduct = await ProductRepository.update(id, updateData);
        return updatedProduct;
    },

    async deleteProduct(id: number): Promise<void> {
        const product = await ProductRepository.findById(id);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        await ProductRepository.delete(id);
    }
}

export default ProductService;