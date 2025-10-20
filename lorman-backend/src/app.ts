import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import { supabaseClient } from "./config/supabaseClient";
import userRoutes from "./routes/users.routes";
import cors from "cors";
import productRoutes from "./routes/products.routes";
import reviewRoutes from "./routes/reviews.routes";
import faqRoutes from "./routes/faq.routes";
import cartRoutes from "./routes/cart.routes";
import paymentsRoutes from "./routes/payments.routes";
import { createCheckoutSession } from "./controllers/payment.controller";
import { sendEmail } from "./utils/mail";

const app = express();

// Make CORS origin configurable via environment variable (CORS_ORIGIN), support comma-separated list
const corsOriginEnv = process.env.CORS_ORIGIN || 'http://localhost:8081';
const corsOrigin = corsOriginEnv.includes(',')
  ? corsOriginEnv.split(',').map(origin => origin.trim())
  : corsOriginEnv;
app.use(cors({
  origin: corsOrigin,
  credentials: true,
}));

app.use("/payments", paymentsRoutes);
app.use(express.json());

app.post("/create-checkout-session", createCheckoutSession);

// TODO: Routes must be defined here 
app.get("/ping", async (req, res) => {
    const { data, error } = await supabaseClient.from("usuarios").select("*").limit(1);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    return res.json({ message: "Conexión exitosa", data });
});

// 🧪 Endpoint de prueba para emails
app.post("/test-email", async (req, res) => {
    try {
        const { to, type = 'simple' } = req.body;

        if (!to) {
            return res.status(400).json({ error: 'Email destinatario requerido' });
        }

        if (type === 'simple') {
            // Email simple de prueba
            await sendEmail({
                to,
                subject: '🧪 Test Email - Lorman',
                htmlContent: `
                    <h1>¡Email de Prueba!</h1>
                    <p>Este es un email de prueba enviado desde Lorman.</p>
                    <p>Fecha: ${new Date().toLocaleString('es-MX')}</p>
                `,
            });
        } else if (type === 'purchase') {
            // Email de compra simulado
            await sendEmail({
                to,
                subject: '✅ Confirmación de Compra - Orden #TEST123',
                htmlContent: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                            .header { background-color: #17a2b8; color: white; padding: 20px; text-align: center; }
                            .content { background-color: #f9f9f9; padding: 30px; }
                            .total { font-size: 1.2em; font-weight: bold; color: #17a2b8; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>¡Gracias por tu compra!</h1>
                            </div>
                            <div class="content">
                                <p>Hola <strong>Cliente de Prueba</strong>,</p>
                                <p>Tu pedido de prueba ha sido confirmado.</p>
                                <h3>Orden #TEST123</h3>
                                <p><strong>Producto:</strong> Garrafón de Agua 20L</p>
                                <p><strong>Cantidad:</strong> 2</p>
                                <p class="total">Total: $160.00</p>
                                <p>Este es un email de prueba.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `,
            });
        } else if (type === 'admin') {
            // Notificación al admin
            await sendEmail({
                to: process.env.ADMIN_EMAIL || to,
                subject: '🛒 Nueva Orden - #TEST123',
                htmlContent: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; color: #333; }
                            .container { max-width: 700px; margin: 0 auto; padding: 20px; }
                            .header { background-color: #1a4d7a; color: white; padding: 20px; text-align: center; }
                            .alert { background-color: #fff3cd; padding: 15px; margin: 20px 0; }
                            .total { background-color: #17a2b8; color: white; padding: 20px; text-align: center; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>🛒 Nueva Orden Recibida (TEST)</h1>
                            </div>
                            <div class="alert">
                                <strong>⚠️ Email de prueba del sistema</strong>
                            </div>
                            <h2>Cliente: Test User</h2>
                            <p>Email: test@example.com</p>
                            <p>Orden #TEST123</p>
                            <p>Productos: Garrafón 20L x2</p>
                            <div class="total">
                                <h2>Total: $160.00</h2>
                            </div>
                        </div>
                    </body>
                    </html>
                `,
            });
        }

        return res.json({ 
            success: true, 
            message: `Email tipo '${type}' enviado correctamente a ${to}` 
        });
    } catch (error) {
        console.error('Error en test de email:', error);
        return res.status(500).json({ 
            error: 'Error al enviar email de prueba',
            details: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes);
app.use("/faqs", faqRoutes);
app.use("/cart", cartRoutes);

app.use(errorHandler);

export default app;