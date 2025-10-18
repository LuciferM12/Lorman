import { z } from 'zod';

export const reviewRegisterSchema = z.object({
    id_cliente: z.coerce.number().min(1, "El ID del cliente es requerido"),
    calificacion: z.coerce.number().min(1, "La calificación mínima es 1").max(5, "La calificación máxima es 5"),
    comentario: z.string().optional().nullable(),
})

export const reviewSchema = reviewRegisterSchema.extend({
    id_resena: z.coerce.number().min(1, "El ID de la reseña es requerido"),
    id_producto: z.coerce.number().min(1, "El ID del producto es requerido").optional().nullable(),
    fecha_resena: z.coerce.date().default(new Date()).optional().nullable(),
})

export type ReviewRegisterDTO = z.infer<typeof reviewRegisterSchema>;
export type ReviewDTO = z.infer<typeof reviewSchema>;