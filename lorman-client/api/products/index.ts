import axios from "axios";
import { API_URL } from "../users";
import { ProductInCartDTO, ProductRegisterDTO } from "@/interfaces/IProduct";

export async function getProducts() {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data.products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export async function updateProduct(productId: number, productData: ProductInCartDTO) {
    try {
        const formData = new FormData();
        
        // Agregar campos normales
        for (const key in productData) {
            if (key !== 'imagen' && (productData as any)[key] !== undefined) {
                formData.append(key, (productData as any)[key]);
            }
        }
        
        // Manejar la imagen según la plataforma
        if (productData.imagen) {
            if (Platform.OS === 'web') {
                // En web, crear un Blob desde la URI
                const response = await fetch(productData.imagen);
                const blob = await response.blob();
                formData.append('imagen', blob, 'photo.jpg');
            } else {
                // En React Native móvil
                const uri = productData.imagen;
                const filename = uri.split('/').pop() || 'photo.jpg';
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : 'image/jpeg';
                
                formData.append('imagen', {
                    uri,
                    name: filename,
                    type,
                } as any);
            }
        }
        const response = await axios.put(`${API_URL}/products/${productId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.product;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
}

import { Platform } from 'react-native';

export async function createProduct(productData: ProductRegisterDTO) {
    try {
        const formData = new FormData();
        
        // Agregar campos normales
        for (const key in productData) {
            if (key !== 'imagen' && (productData as any)[key] !== undefined) {
                formData.append(key, (productData as any)[key]);
            }
        }
        
        // Manejar la imagen según la plataforma
        if (productData.imagen) {
            if (Platform.OS === 'web') {
                // En web, crear un Blob desde la URI
                const response = await fetch(productData.imagen);
                const blob = await response.blob();
                formData.append('imagen', blob, 'photo.jpg');
            } else {
                // En React Native móvil
                const uri = productData.imagen;
                const filename = uri.split('/').pop() || 'photo.jpg';
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : 'image/jpeg';
                
                formData.append('imagen', {
                    uri,
                    name: filename,
                    type,
                } as any);
            }
        }
        
        const response = await axios.post(`${API_URL}/products`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        
        return response.data.product;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}

export async function deleteProduct(productId: number) {
    try {
        const response = await axios.delete(`${API_URL}/products/${productId}`);
        return response.data.message;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
}