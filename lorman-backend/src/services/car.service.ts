import CarritoRepository from "../repositories/car.repository";
import {
    CarritoDTO,
    CarDetailDTO,
    CarDetailWithIdDTO
} from "../interfaces/car.interface";

const CarritoService = {

    async createCarrito(data: Omit<CarritoDTO, "id_carrito">): Promise<CarritoDTO> {
        const existingCarrito = await CarritoRepository.findByCliente(data.id_usuario);
        if (existingCarrito) {
            //throw new Error(`El usuario ya tiene un carrito activo`);
            return {} as CarritoDTO;

        }

        const newCarrito = await CarritoRepository.createCarrito(data);
        return newCarrito;
    },

    async getCarritoByCliente(id_cliente: number): Promise<{ id_carrito: number } | null> {
        const carritoCompleto = await CarritoRepository.findByCliente(id_cliente);
        if (!carritoCompleto) {
            //throw new Error(`Carrito no encontrado para el cliente con ID ${id_cliente}`);
            return null
        }

        return { id_carrito: carritoCompleto.id_carrito };
    },

    async listCarritoDetails(id_usuario: number): Promise<CarDetailWithIdDTO[]> {
        const carrito = await CarritoRepository.findByCliente(id_usuario);
        if (!carrito) {
            throw new Error(`Carrito no encontrado para el cliente con ID ${id_usuario}`);
        }
        const id_carrito = carrito.id_carrito;
        const detalles = await CarritoRepository.listDetails(id_carrito);
        if (!detalles || detalles.length === 0) {
            return [];
        }
        return detalles;
    },

    async addProductToCarrito(data: CarDetailDTO): Promise<CarDetailWithIdDTO> {
        const carrito = await CarritoRepository.findByCarrito(data.id_carrito);
        if (!carrito) {
            throw new Error(`El carrito con ID ${data.id_carrito} no existe`);
        }

        const newDetail = await CarritoRepository.addDetail(data);
        return newDetail;
    },

    async updateProductQuantity(id_detalle_carrito: number, cantidad: number): Promise<CarDetailWithIdDTO> {
        const updated = await CarritoRepository.updateDetail(id_detalle_carrito, cantidad);
        if (!updated) {
            throw new Error(`Detalle de carrito no encontrado`);
        }
        return updated;
    },

    async removeProductFromCarrito(id_detalle_carrito: number): Promise<void> {
        await CarritoRepository.deleteDetail(id_detalle_carrito);
    },

    async clearCarrito(id_carrito: number): Promise<void> {
        await CarritoRepository.clearCarrito(id_carrito);
    },
};

export default CarritoService;
