import { z } from 'zod';

const envSchema = z.object({
    BUCKET_NAME: z.string().min(1, "BUCKET_NAME es requerido"),
});

const env = envSchema.parse(process.env);

export default env.BUCKET_NAME;