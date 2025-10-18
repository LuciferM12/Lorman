import { z } from 'zod';

export const productRegisterSchema = z.object({
    nombre_producto: z.string().min(1, "El nombre del producto es requerido"),
    descripcion: z.string().optional(),
    precio_unitario: z.coerce.number().min(0, "El precio unitario debe ser un número positivo"),
    stock: z.coerce.number().min(0, "El stock debe ser un número positivo"),
})

export const ProductSchema = productRegisterSchema.extend({
    id_producto: z.number(),
    disponible: z.boolean().default(true),
})

export type ProductRegisterDTO = z.infer<typeof productRegisterSchema>;
export type ProductDTO = z.infer<typeof ProductSchema>;