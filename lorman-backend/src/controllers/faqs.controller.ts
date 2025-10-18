import { Request, Response } from "express";
import { faqRegisterSchema } from "../interfaces/faq.interface";
import FaqService from "../services/faq.service";

const FaqController = {
    async createFaq(req: Request, res: Response) {
        try {
            const parsed = faqRegisterSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ error: "Solicitud de datos inválida", details: parsed.error.flatten().fieldErrors })
            }

            const newFaq = await FaqService.createFaq(parsed.data);
            res.status(201).json({ message: "FAQ creada exitosamente", faq: newFaq });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const faqs = await FaqService.listFaqs();
            res.status(200).json({ faqs });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async updateFaq(req: Request, res: Response) {
        try {
            if (!req.params.id_faq) {
                return res.status(400).json({ error: "ID de FAQ no proporcionado" });
            }

            const faqId = parseInt(req.params.id_faq, 10);
            if (isNaN(faqId) || faqId <= 0) {
                return res.status(400).json({ error: "El ID de la FAQ debe ser un entero positivo" });
            }

            const updatedData = { ...req.body, id_pregunta: faqId };
            const parsed = faqRegisterSchema.safeParse(updatedData);
            if (!parsed.success) {
                return res.status(400).json({ error: "Solicitud de datos inválida", details: parsed.error.flatten().fieldErrors });
            }

            const updatedFaq = await FaqService.updateFaq(faqId, parsed.data);
            res.status(200).json({ message: "FAQ actualizada exitosamente", faq: updatedFaq });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async getById(req: Request, res: Response) {
        try {
            if (!req.params.id_faq) {
                return res.status(400).json({ error: "ID de FAQ no proporcionado" });
            }
            const faqId = parseInt(req.params.id_faq, 10);
            if (isNaN(faqId) || faqId <= 0) {
                return res.status(400).json({ error: "El ID de la FAQ debe ser un entero positivo" });
            }
            const faq = await FaqService.getFaqById(faqId);
            if (!faq) {
                return res.status(404).json({ error: "FAQ no encontrada" });
            }
            res.status(200).json({ faq });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async setFaqVisibility(req: Request, res: Response) {
        try {
            if (!req.params.id_faq) {
                return res.status(400).json({ error: "ID de FAQ no proporcionado" });
            }
            const faqId = parseInt(req.params.id_faq, 10);
            if (isNaN(faqId) || faqId <= 0) {
                return res.status(400).json({ error: "El ID de la FAQ debe ser un entero positivo" });
            }
            const { visible } = req.body;
            if (typeof visible !== 'boolean') {
                return res.status(400).json({ error: "El estado de visibilidad debe ser un valor booleano" });
            }

            await FaqService.setFaqVisibility(faqId, visible);
            res.status(200).json({ message: "Visibilidad de la FAQ actualizada exitosamente" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async deleteFaq(req: Request, res: Response) {
        try {
            if (!req.params.id_faq) {
                return res.status(400).json({ error: "ID de FAQ no proporcionado" });
            }
            const faqId = parseInt(req.params.id_faq, 10);
            if (isNaN(faqId) || faqId <= 0) {
                return res.status(400).json({ error: "El ID de la FAQ debe ser un entero positivo" });
            }
            await FaqService.deleteFaq(faqId);
            res.status(200).json({ message: "FAQ eliminada exitosamente" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default FaqController