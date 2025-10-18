import { z } from 'zod';

export const faqRegisterSchema = z.object({
    pregunta: z.string().min(1, "La pregunta es requerida"),
    respuesta: z.string().min(1, "La respuesta es requerida"),
    visible_publicamente: z.boolean().default(true),
});

export const faqSchema = faqRegisterSchema.extend({
    id_faq: z.coerce.number().min(1, "El ID de la FAQ es requerido"),
});

export type FaqRegisterDTO = z.infer<typeof faqRegisterSchema>;
export type FaqDTO = z.infer<typeof faqSchema>;