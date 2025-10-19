import { z } from 'zod';
import { productCart } from './IProduct';

export const cartSchema = z.object({
    id: z.coerce.number(),
    id_detalle_carrito: z.coerce.number(),
    name: z.string().min(1, 'El nombre es obligatorio'),
    descripcion: z.string().optional(),
    precio: z.coerce.number().min(0, 'El precio debe ser un número positivo'),
    cantidad: z.coerce.number().min(1, 'La cantidad debe ser al menos 1'),
    imagen: z.string().url('La imagen debe ser una URL válida').optional()
})

export const carDetailSchema = z.object({
    id_carrito: z.coerce.number().min(1, "El ID del carrito es requerido"),
    id_producto: z.coerce.number().min(1, "El ID del producto es requerido"),
    cantidad: z.coerce.number().min(1, "La cantidad mínima es 1"),
})

export const responseCartDetailSchema = z.object({
    id_detalle_carrito: z.coerce.number().min(1, "El ID del detalle del carrito es requerido"),
    cantidad: z.coerce.number().min(1, "La cantidad mínima es 1"),
    id_producto: z.coerce.number().min(1, "El ID del producto es requerido"),
    id_carrito: z.coerce.number().min(1, "El ID del carrito es requerido"),
    productos: productCart,
})

export const detailCartSchema = z.object({
    details: z.array(responseCartDetailSchema),
})

export const carDetailSchemaWithId = carDetailSchema.extend({
    id_detalle_carrito: z.coerce.number().min(1, "El ID del detalle del carrito es requerido"),
    productos: productCart,
})




export type CartItem = z.infer<typeof cartSchema>;
export type CarDetailDTO = z.infer<typeof carDetailSchema>;
export type CarDetailWithIdDTO = z.infer<typeof carDetailSchemaWithId>;
export type ResponseCartDetailDTO = z.infer<typeof responseCartDetailSchema>;
export type DetailCartDTO = z.infer<typeof detailCartSchema>;