import * as brevo from '@getbrevo/brevo';

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY || ''
);

interface SendEmailParams {
    to: string;
    subject: string;
    htmlContent: string;
    senderName?: string;
    senderEmail?: string;
}

export const sendEmail = async ({
    to,
    subject,
    htmlContent,
    senderName = 'Lorman',
    senderEmail = 'lormanslpce@gmail.com',
}: SendEmailParams): Promise<void> => {
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = { name: senderName, email: senderEmail };
    sendSmtpEmail.to = [{ email: to }];

    try {
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// Tipos para el email de compra
export interface PurchaseEmailData {
    customerEmail: string;
    customerName: string;
    orderId: string;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
        subtotal: number;
    }>;
    total: number;
    purchaseDate: string;
    deliveryAddress?: string;
}

// Generar HTML para email de confirmación al cliente
export const generateCustomerPurchaseEmail = (data: PurchaseEmailData): string => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
                .header { background-color: #17a2b8; color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .header h1 { margin: 0; font-size: 28px; }
                .content { background-color: white; padding: 30px; border-radius: 0 0 8px 8px; }
                .order-info { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #17a2b8; }
                .order-info h2 { margin-top: 0; color: #17a2b8; font-size: 20px; }
                .item-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                .item-table th { background-color: #17a2b8; color: white; padding: 12px; text-align: left; }
                .item-table td { padding: 12px; border-bottom: 1px solid #eee; }
                .item-table tr:last-child td { border-bottom: none; }
                .total-row { font-weight: bold; background-color: #f8f9fa; }
                .total-amount { font-size: 24px; color: #17a2b8; font-weight: bold; text-align: right; margin-top: 20px; }
                .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; color: #666; font-size: 14px; }
                .btn { display: inline-block; background-color: #17a2b8; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
                .highlight { background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>✅ ¡Compra Confirmada!</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px;">Gracias por tu preferencia</p>
                </div>
                <div class="content">
                    <p>Hola <strong>${data.customerName}</strong>,</p>
                    <p>Tu pedido ha sido recibido y confirmado exitosamente. A continuación los detalles:</p>
                    
                    <div class="order-info">
                        <h2>📋 Información del Pedido</h2>
                        <p><strong>Número de Orden:</strong> #${data.orderId}</p>
                        <p><strong>Fecha:</strong> ${data.purchaseDate}</p>
                        ${data.deliveryAddress ? `<p><strong>Dirección de Entrega:</strong> ${data.deliveryAddress}</p>` : ''}
                    </div>

                    <h3>🛒 Productos Ordenados</h3>
                    <table class="item-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th style="text-align: center;">Cantidad</th>
                                <th style="text-align: right;">Precio</th>
                                <th style="text-align: right;">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.items.map(item => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td style="text-align: center;">${item.quantity}</td>
                                    <td style="text-align: right;">$${item.price.toFixed(2)}</td>
                                    <td style="text-align: right;">$${item.subtotal.toFixed(2)}</td>
                                </tr>
                            `).join('')}
                            <tr class="total-row">
                                <td colspan="3" style="text-align: right; padding-right: 12px;">TOTAL:</td>
                                <td style="text-align: right; color: #17a2b8; font-size: 18px;">$${data.total.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="highlight">
                        <strong>📦 Próximos pasos:</strong>
                        <ul style="margin: 10px 0;">
                            <li>Nos pondremos en contacto contigo para confirmar la entrega</li>
                            <li>Prepararemos tu pedido con el mayor cuidado</li>
                            <li>Recibirás tu orden en la fecha acordada</li>
                        </ul>
                    </div>

                    <p>Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.</p>

                    <div class="footer">
                        <p><strong>Gracias por confiar en Lorman</strong></p>
                        <p>© ${new Date().getFullYear()} Lorman. Todos los derechos reservados.</p>
                        <p style="font-size: 12px; color: #999;">Este es un correo automático, por favor no responder.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
};

// Generar HTML para email de notificación al admin
export const generateAdminPurchaseEmail = (data: PurchaseEmailData): string => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                .container { max-width: 700px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; }
                .header { background-color: #1a4d7a; color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .alert { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 5px; }
                .content { background-color: white; padding: 30px; border-radius: 0 0 8px 8px; }
                .customer-box { background-color: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0d6efd; }
                .item-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                .item-table th { background-color: #1a4d7a; color: white; padding: 12px; text-align: left; }
                .item-table td { padding: 12px; border-bottom: 1px solid #eee; }
                .total-box { background-color: #17a2b8; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-top: 20px; }
                .total-box h2 { margin: 0; font-size: 32px; }
                .action-steps { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .btn { display: inline-block; background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🛒 Nueva Orden Recibida</h1>
                    <p style="margin: 10px 0 0 0; font-size: 18px;">Orden #${data.orderId}</p>
                </div>
                <div class="content">
                    <div class="alert">
                        <strong>⚠️ Acción requerida:</strong> Nueva compra pendiente de procesamiento
                    </div>

                    <div class="customer-box">
                        <h2 style="margin-top: 0; color: #0d6efd;">👤 Información del Cliente</h2>
                        <p><strong>Nombre:</strong> ${data.customerName}</p>
                        <p><strong>Email:</strong> ${data.customerEmail}</p>
                        <p><strong>Fecha de compra:</strong> ${data.purchaseDate}</p>
                        ${data.deliveryAddress ? `<p><strong>Dirección:</strong> ${data.deliveryAddress}</p>` : ''}
                    </div>

                    <h2>📦 Detalles de la Orden</h2>
                    <table class="item-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th style="text-align: center;">Cantidad</th>
                                <th style="text-align: right;">Precio Unit.</th>
                                <th style="text-align: right;">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.items.map(item => `
                                <tr>
                                    <td><strong>${item.name}</strong></td>
                                    <td style="text-align: center;">${item.quantity}</td>
                                    <td style="text-align: right;">$${item.price.toFixed(2)}</td>
                                    <td style="text-align: right;">$${item.subtotal.toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <div class="total-box">
                        <p style="margin: 0; font-size: 16px;">Total de la Orden</p>
                        <h2>$${data.total.toFixed(2)}</h2>
                    </div>

                    <div class="action-steps">
                        <h3 style="margin-top: 0;">📋 Próximos Pasos</h3>
                        <ol>
                            <li>Verificar disponibilidad de productos en inventario</li>
                            <li>Contactar al cliente para confirmar dirección y horario</li>
                            <li>Preparar el pedido para entrega</li>
                            <li>Actualizar el estado del pedido en el sistema</li>
                        </ol>
                    </div>

                    <div style="text-align: center;">
                        <a href="${process.env.ADMIN_PANEL_URL || '#'}/pedidos/${data.orderId}" class="btn">
                            Ver Pedido Completo
                        </a>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
};

// Enviar emails de compra (cliente + admin)
export const sendPurchaseEmails = async (data: PurchaseEmailData): Promise<void> => {
    try {
        // Email al cliente
        await sendEmail({
            to: data.customerEmail,
            subject: `✅ Confirmación de Compra - Orden #${data.orderId}`,
            htmlContent: generateCustomerPurchaseEmail(data),
        });

        // Email al admin (no lanzar error si falla)
        try {
            const adminEmail = process.env.ADMIN_EMAIL;
            if (adminEmail) {
                await sendEmail({
                    to: adminEmail,
                    subject: `🛒 Nueva Orden Recibida - #${data.orderId}`,
                    htmlContent: generateAdminPurchaseEmail(data),
                });
            }
        } catch (adminError) {
            console.error('Error al enviar email al admin (no crítico):', adminError);
        }

        console.log('Emails de compra enviados correctamente');
    } catch (error) {
        console.error('Error al enviar emails de compra:', error);
        throw error;
    }
};