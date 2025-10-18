import { supabaseClient } from "../config/supabaseClient";
import { ProductDTO, ProductRegisterDTO, ProductSchema } from "../interfaces/products.interface";

const TABLE = "productos";

const ProductRepository = {
    async create(data: ProductRegisterDTO): Promise<ProductDTO> {
        const { data: result, error } = await supabaseClient.from(TABLE).insert([data]).select('*').single();
        if (error) {
            throw new Error(`Error creando el producto: ${error.message}`);
        }
        return ProductSchema.parse(result);
    },

    async findById(id: number): Promise<ProductDTO | null> {
        const { data, error } = await supabaseClient.from(TABLE).select('*').eq('id_producto', id).single();

        if (error) {
            if (error.code === 'PGRST116') { // No rows found
                return null;
            }
            throw new Error(`Error encontrando el producto por id: ${error.message}`);
        }
        return ProductSchema.parse(data);
    },

    async list(limit = 100, offset = 0): Promise<ProductDTO[]> {
        const { data, error } = await supabaseClient.from(TABLE).select('*').range(offset, offset + limit - 1);

        if (error) {
            throw new Error(`Error listando productos: ${error.message}`);
        }
        return data as ProductDTO[];
    },

    async update(id: number, data: Partial<ProductDTO>): Promise<ProductDTO> {
        const { data: result, error } = await supabaseClient.from(TABLE).update(data).eq('id_producto', id).select('*').single();

        if (error) {
            throw new Error(`Error actualizando el producto: ${error.message}`);
        }
        return ProductSchema.parse(result);
    },

    async delete(id: number): Promise<void> {
        const { error } = await supabaseClient.from(TABLE).delete().eq('id_producto', id);

        if (error) {
            throw new Error(`Error eliminando el producto: ${error.message}`);
        }
    }
};