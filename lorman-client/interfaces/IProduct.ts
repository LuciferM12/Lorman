import { z } from 'zod';

export const productRegisterSchema = z.object({
    nombre_producto: z.string().min(1, "El nombre del producto es requerido"),
    descripcion: z.string().optional(),
    precio_unitario: z.coerce.number().min(0, "El precio unitario debe ser un número positivo"),
    stock: z.coerce.number().min(0, "El stock debe ser un número positivo"),
})

export const productCart = productRegisterSchema.omit({ stock: true }).extend({
    id_producto: z.number().min(1, "El ID del producto es requerido"),
    image: z.string().url("La imagen debe ser una URL válida").optional().nullable(),
});

export const productUpdatedSchema = z.object({
    id_producto: z.number().min(1, "El ID del producto es requerido"),
    id_carrito: z.number().min(1, "El ID del carrito es requerido"),
    cantidad: z.coerce.number().min(1, "La cantidad mínima es 1"),
    id_detalle_carrito: z.number().min(1, "El ID del detalle del carrito es requerido"),
})

const productAdditionSchema = z.object({
    id_usuario: z.coerce.number().min(1, "El ID del usuario es requerido"),
    id_producto: z.coerce.number().min(1, "El ID del producto es requerido"),
    cantidad: z.coerce.number().min(1, "La cantidad mínima es 1"),
})

export type ProductRegisterDTO = z.infer<typeof productRegisterSchema>;
export type ProductInCartDTO = z.infer<typeof productCart>;
export type ProductQuantityUpdatedDTO = z.infer<typeof productUpdatedSchema>;
export type ProductAdditionDTO = z.infer<typeof productAdditionSchema>;