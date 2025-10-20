import { supabaseClient } from "../config/supabaseClient";
import {
    carritoSchema,
    carDetailSchemaWithId,
    CarritoDTO,
    CarDetailDTO,
    CarDetailWithIdDTO,
    carDetailUpdateSchemaWithoutProductos,
    CarDetailUpdateWithoutProductosDTO,
} from "../interfaces/car.interface";

const TABLE_CART = "carrito";
const TABLE_DETAILS = "detalles_carrito";

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

    async findByCarrito(id_carrito: number): Promise<CarritoDTO | null> {
        const { data, error } = await supabaseClient
            .from(TABLE_CART)
            .select("*")
            .eq("id_carrito", id_carrito)
            .single();
        if (error) {
            if (error.code === "PGRST116") return null;
            throw new Error(`Error buscando el carrito: ${error.message}`);
        }
        return carritoSchema.parse(data);
    },

    async findByCliente(id_cliente: number): Promise<{ id_carrito: number } | null> {
        const { data, error } = await supabaseClient
            .from(TABLE_CART)
            .select("id_carrito")
            .eq("id_usuario", id_cliente)
            .single();

        if (error) {
            if (error.code === "PGRST116") return null; // No existe
            throw new Error(`Error buscando el carrito del usuario: ${error.message}`);
        }

        return data;
    },

    // Nueva función para obtener carrito completo con detalles
    async getCarritoByCliente(id_cliente: number): Promise<CarDetailWithIdDTO[]> {
        // 1. Buscar el carrito del cliente
        const carritoData = await this.findByCliente(id_cliente);
        
        if (!carritoData) {
            return []; // No tiene carrito o está vacío
        }

        // 2. Obtener los detalles del carrito con productos
        const items = await this.listDetails(carritoData.id_carrito);
        
        return items;
    },

    async findByProductInCarrito(id_carrito: number, id_producto: number): Promise<CarDetailWithIdDTO | null> {
        const { data, error } = await supabaseClient
            .from(TABLE_DETAILS)
            .select("*")
            .eq("id_carrito", id_carrito)
            .eq("id_producto", id_producto)
            .single();

        if (error) {
            if (error.code === "PGRST116") return null;
            throw new Error(`Error buscando el producto en el carrito: ${error.message}`);
        }

        return carDetailSchemaWithId.parse(data);
    },

    async listDetails(id_carrito: number): Promise<CarDetailWithIdDTO[]> {
        const { data, error } = await supabaseClient
            .from(TABLE_DETAILS)
            .select(`
                *,
                productos (
                id_producto,
                nombre_producto,
                precio_unitario,
                descripcion
                )
            `)
            .eq("id_carrito", id_carrito)
            .order("id_producto", { ascending: true });

        if (error) {
            throw new Error(`Error listando los detalles del carrito: ${error.message}`);
        }

        return carDetailSchemaWithId.array().parse(data);
    },

    async addDetail(data: CarDetailDTO): Promise<CarDetailUpdateWithoutProductosDTO> {
        const { data: result, error } = await supabaseClient
            .from(TABLE_DETAILS)
            .insert([data])
            .select("*")
            .single();

        if (error) {
            throw new Error(`Error agregando producto al carrito: ${error.message}`);
        }

        return carDetailUpdateSchemaWithoutProductos.parse(result);
    },

    async updateDetail(id_detalle_carrito: number, cantidad: number): Promise<CarDetailUpdateWithoutProductosDTO> {
        const { data: result, error } = await supabaseClient
            .from(TABLE_DETAILS)
            .update({ cantidad })
            .eq("id_detalle_carrito", id_detalle_carrito)
            .select("*")
            .single();

        if (error) {
            throw new Error(`Error actualizando la cantidad: ${error.message}`);
        }

        return carDetailUpdateSchemaWithoutProductos.parse(result);
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

    async clearCarritoByCliente(id_cliente: number): Promise<void> {
        const carritoData = await this.findByCliente(id_cliente);
        
        if (!carritoData) {
            throw new Error(`Carrito no encontrado para el cliente con ID ${id_cliente}`);
        }

        const { error } = await supabaseClient
            .from(TABLE_DETAILS)
            .delete()
            .eq("id_carrito", carritoData.id_carrito);

        if (error) {
            throw new Error(`Error vaciando el carrito: ${error.message}`);
        }
    },
};

export default CarritoRepository;
