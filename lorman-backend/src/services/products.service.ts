import { ProductDTO, ProductRegisterDTO } from "../interfaces/products.interface";
import ProductRepository from "../repositories/products.repository";

const ProductService = {
    async createProduct(data: ProductRegisterDTO): Promise<ProductDTO> {
        const newProduct = await ProductRepository.create(data);
        return newProduct;
    },

    async getProductById(id: number): Promise<ProductDTO> {
        const product = await ProductRepository.findById(id);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        return product;
    },

    async listProducts(limit = 100, offset = 0): Promise<ProductDTO[]> {
        const products = await ProductRepository.list(limit, offset);
        if (!products || products.length === 0) {
            return [];
        }
        return products;
    },

    async updateProduct(id: number, data: Partial<ProductDTO>): Promise<ProductDTO> {
        const product = await ProductRepository.findById(id);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        const updatedProduct = await ProductRepository.update(id, data);
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