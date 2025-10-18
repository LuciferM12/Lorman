import { LoginInput } from '@/interfaces/ILogin'
import axios from 'axios'

export const API_URL = process.env.EXPO_PUBLIC_API_URL_LOCAL;

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