import { z } from 'zod';

export const carDetailSchema = z.object({
    id_carrito: z.coerce.number().min(1, "El ID del carrito es requerido"),
    id_producto: z.coerce.number().min(1, "El ID del producto es requerido"),
    cantidad: z.coerce.number().min(1, "La cantidad mínima es 1"),
})

export const carDetailSchemaWithId = carDetailSchema.extend({
    id_detalle_carrito: z.coerce.number().min(1, "El ID del detalle del carrito es requerido"),
})

export const carritoSchema = z.object({
    id_carrito: z.coerce.number().min(1, "El ID del carrito es requerido"),
    id_cliente: z.coerce.number().min(1, "El ID del cliente es requerido"),
    fecha_ultima_modificacion: z.coerce.date().default(new Date()).optional().nullable(),
})

export type CarDetailDTO = z.infer<typeof carDetailSchema>;
export type CarDetailWithIdDTO = z.infer<typeof carDetailSchemaWithId>;
export type CarritoDTO = z.infer<typeof carritoSchema>;
