import { FaqDTO, FaqRegisterDTO } from "../interfaces/faq.interface";
import FaqRepository from "../repositories/faq.repository";

const FaqService = {
    async createFaq(data: FaqRegisterDTO): Promise<FaqDTO> {
        const newFaq = await FaqRepository.createFAQ(data);
        return newFaq;
    },

    async getFaqById(id: number): Promise<FaqDTO> {
        const faq = await FaqRepository.findById(id);
        if (!faq) {
            throw new Error(`FAQ not found`);
        }
        return faq;
    },

    async listFaqs(onlyVisible = true, limit = 100, offset = 0): Promise<FaqDTO[]> {
        const faqs = await FaqRepository.listFAQs(onlyVisible, limit, offset);
        if (!faqs || faqs.length === 0) {
            return [];
        }
        return faqs;
    },

    async updateFaq(id: number, data: Partial<FaqDTO>): Promise<FaqDTO> {
        const faq = await FaqRepository.findById(id);
        if (!faq) {
            throw new Error(`FAQ not found`);
        }
        const updatedFaq = await FaqRepository.updateFAQ(id, data);
        return updatedFaq;
    },

    async setFaqVisibility(id: number, status: boolean): Promise<void> {
        const faq = await FaqRepository.findById(id);
        if (!faq) {
            throw new Error(`FAQ not found`);
        }
        await FaqRepository.setVisibility(id, status);
    },

    async deleteFaq(id: number): Promise<void> {
        const faq = await FaqRepository.findById(id);
        if (!faq) {
            throw new Error(`FAQ not found`);
        }
        await FaqRepository.deleteFAQ(id);
    }
};

export default FaqService;