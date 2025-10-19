import { z } from 'zod';

export const cartSchema = z.object({
    id: z.coerce.number(),
    name: z.string().min(1, 'El nombre es obligatorio'),
    descripcion: z.string().optional(),
    precio: z.coerce.number().min(0, 'El precio debe ser un número positivo'),
    cantidad: z.coerce.number().min(1, 'La cantidad debe ser al menos 1'),
    imagen: z.string().url('La imagen debe ser una URL válida').optional()
})

export type CartItem = z.infer<typeof cartSchema>;