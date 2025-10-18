import { LoginInput } from '@/interfaces/ILogin'
import axios from 'axios'

export const API_URL = process.env.EXPO_PUBLIC_API_URL_LOCAL;

export async function loginUser(data: LoginInput) {
    console.log("Attempting to log in user with data:", API_URL);
    try {
        const response = await axios.post(`${API_URL}/users/login`, {
            email: data.email,
            password: data.password,
        })
        return response.data
    } catch (error: any) {
        if (error.response) {
            console.error('Error en la respuesta del servidor:', error.response.data)
        } else {
            console.error('Error en la solicitud:', error.message)
        }
    }
}