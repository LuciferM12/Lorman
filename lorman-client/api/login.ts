import { LoginInput } from '@/interfaces/ILogin'
import axios from 'axios'

const apiUrl = process.env.EXPO_PUBLIC_API_URL_LOCAL;
if (!apiUrl) {
    throw new Error('API_URL is not defined. Please set EXPO_PUBLIC_API_URL_LOCAL in your environment variables.');
}
export const API_URL = apiUrl;

export async function loginUser(data: LoginInput) {
    try {
        const response = await axios.post(`${API_URL}/users/login`, {
            email: data.email,
            password: data.password,
        })
        return response.data
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Error en la respuesta del servidor: ${error.response.data}`);
        } else {
            throw new Error(`Error en la solicitud: ${error.message}`);
        }
    }
}