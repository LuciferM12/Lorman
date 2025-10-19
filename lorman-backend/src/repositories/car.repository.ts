import { supabaseClient } from "../config/supabaseClient";
import {
    carritoSchema,
    carDetailSchemaWithId,
    CarritoDTO,
    CarDetailDTO,
    CarDetailWithIdDTO,
} from "../interfaces/car.interface";

const TABLE_CART = "carrito";
const TABLE_DETAILS = "detalle_carrito";

const CarritoRepository = {

    async createCarrito(data: Omit<CarritoDTO, "id_carrito">): Promise<CarritoDTO> {
        const { data: result, error } = await supabaseClient
            .from(TABLE_CART)
            .insert([data])
            .select("*")
            .single();

        if (error) {
            throw new Error(`Error creando el carrito: ${error.message}`);
        }

        return carritoSchema.parse(result);
    },

    async findByCliente(id_cliente: number): Promise<CarritoDTO | null> {
        const { data, error } = await supabaseClient
            .from(TABLE_CART)
            .select("*")
            .eq("id_cliente", id_cliente)
            .single();

        if (error) {
            if (error.code === "PGRST116") return null; // No existe
            throw new Error(`Error buscando el carrito del cliente: ${error.message}`);
        }

        return carritoSchema.parse(data);
    },

    async listDetails(id_carrito: number): Promise<CarDetailWithIdDTO[]> {
        const { data, error } = await supabaseClient
            .from(TABLE_DETAILS)
            .select("*")
            .eq("id_carrito", id_carrito);

        if (error) {
            throw new Error(`Error listando los detalles del carrito: ${error.message}`);
        }

        return carDetailSchemaWithId.array().parse(data);
    },

    async addDetail(data: CarDetailDTO): Promise<CarDetailWithIdDTO> {
        const { data: result, error } = await supabaseClient
            .from(TABLE_DETAILS)
            .insert([data])
            .select("*")
            .single();

        if (error) {
            throw new Error(`Error agregando producto al carrito: ${error.message}`);
        }

        return carDetailSchemaWithId.parse(result);
    },

    async updateDetail(id_detalle_carrito: number, cantidad: number): Promise<CarDetailWithIdDTO> {
        const { data: result, error } = await supabaseClient
            .from(TABLE_DETAILS)
            .update({ cantidad })
            .eq("id_detalle_carrito", id_detalle_carrito)
            .select("*")
            .single();

        if (error) {
            throw new Error(`Error actualizando la cantidad: ${error.message}`);
        }

        return carDetailSchemaWithId.parse(result);
    },

    async deleteDetail(id_detalle_carrito: number): Promise<void> {
        const { error } = await supabaseClient
            .from(TABLE_DETAILS)
            .delete()
            .eq("id_detalle_carrito", id_detalle_carrito);

        if (error) {
            throw new Error(`Error eliminando producto del carrito: ${error.message}`);
        }
    },

    async clearCarrito(id_carrito: number): Promise<void> {
        const { error } = await supabaseClient
            .from(TABLE_DETAILS)
            .delete()
            .eq("id_carrito", id_carrito);

        if (error) {
            throw new Error(`Error vaciando el carrito: ${error.message}`);
        }
    },
};

export default CarritoRepository;
