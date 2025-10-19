import { z } from 'zod';

export const promotionRegisterSchema = z.object({
    id_promocion: z.coerce.number().min(1, 'ID de promoción inválido'),
    nombre_promocion: z.string().min(2).max(100),
    descripcion: z.string().min(10).max(500).optional().nullable(),
    tipo_descuento: z.enum(['porcentaje', 'monto_fijo']),
    monto_descuento: z.number().min(0),
    fecha_inicio: z.coerce.date(),
    fecha_fin: z.coerce.date(),
    activa: z.boolean().default(true),
});

export const promotionProductLinkSchema = z.object({
    id_promocion: z.coerce.number().min(1, 'ID de promoción inválido'),
    id_producto: z.coerce.number().min(1, 'ID de producto inválido'),
});

export type PromotionRegister = z.infer<typeof promotionRegisterSchema>;
export type PromotionProductLink = z.infer<typeof promotionProductLinkSchema>;