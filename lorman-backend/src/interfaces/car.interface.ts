import { z } from 'zod';
import { productCart } from './products.interface';

export const carDetailSchema = z.object({
    id_carrito: z.coerce.number().min(1, "El ID del carrito es requerido"),
    id_producto: z.coerce.number().min(1, "El ID del producto es requerido"),
    cantidad: z.coerce.number().min(1, "La cantidad mínima es 1"),
})

export const carDetailSchemaWithoutCarrito = carDetailSchema.omit({ id_carrito: true });

export const carDetailUpdateSchema = z.object({
    id_usuario: z.coerce.number().min(1, "El ID del usuario es requerido"),
    id_producto: z.coerce.number().min(1, "El ID del producto es requerido"),
    cantidad: z.coerce.number().min(1, "La cantidad mínima es 1"),
})

export const carDetailSchemaWithId = carDetailSchema.extend({
    id_detalle_carrito: z.coerce.number().min(1, "El ID del detalle del carrito es requerido"),
    productos: productCart,
})

export const carDetailUpdateSchemaWithoutProductos = carDetailSchemaWithId.omit({ productos: true });

export const carDetailSchemaWithUser = carDetailSchemaWithoutCarrito.extend({
    id_usuario: z.coerce.number().min(1, "El ID del usuario es requerido"),
})

export const carritoSchema = z.object({
    id_carrito: z.coerce.number().min(1, "El ID del carrito es requerido"),
    id_usuario: z.coerce.number().min(1, "El ID del usuario es requerido"),
    fecha_ultima_modificacion: z.coerce.date().default(new Date()).optional().nullable(),
})

export const carritoSchemaWithoutId = carritoSchema.omit({ id_carrito: true });

export type CarDetailDTO = z.infer<typeof carDetailSchema>;
export type CarDetailWithIdDTO = z.infer<typeof carDetailSchemaWithId>;
export type CarritoDTO = z.infer<typeof carritoSchema>;
export type CarDetailUpdateDTO = z.infer<typeof carDetailUpdateSchema>;
export type CarDetailWithUserDTO = z.infer<typeof carDetailSchemaWithUser>;
export type CarritoWithoutIdDTO = z.infer<typeof carritoSchemaWithoutId>;
export type CarDetailUpdateWithoutProductosDTO = z.infer<typeof carDetailUpdateSchemaWithoutProductos>;