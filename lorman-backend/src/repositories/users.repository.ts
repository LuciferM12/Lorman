import { supabaseClient } from "../config/supabaseClient";
import { RegisterUserDTO, UserDTO, UserResponseDTO, UserResponseSchema } from "../interfaces/users.interface";

const TABLE = "usuarios";

const UserRepository = {
    async create(data: RegisterUserDTO): Promise<UserResponseDTO> {
        const { data: result, error } = await supabaseClient.from(TABLE).insert([data]).select('*').single();
        if (error) {
            throw new Error(`Error creando el usuario: ${error.message}`);
        }
        const userWithoutPassword = UserResponseSchema.parse(result);
        return userWithoutPassword;
    },

    async findById(id: number): Promise<UserDTO | null> {
        const { data, error } = await supabaseClient.from(TABLE).select('*').eq('id_usuario', id).single();
        if (error) {
            if (error.code === 'PGRST116') { // No rows found
                return null;
            }
            throw new Error(`Error encontrando el usuario por id: ${error.message}`);
        }
        return data as UserDTO;
    },

    async findByEmail(email: string): Promise<UserDTO | null> {
        const { data, error } = await supabaseClient.from(TABLE).select('*').eq('email', email).single();
        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            throw new Error(`Error encontrando el usuario por correo electrónico: ${error.message}`);
        }
        return data as UserDTO;
    },

    async list(limit = 100, offset = 0): Promise<UserDTO[]> {
        const { data, error } = await supabaseClient.from(TABLE).select('*').range(offset, offset + limit - 1);
        if (error) {
            throw new Error(`Error listando usuarios: ${error.message}`);
        }
        return data as UserDTO[];
    },

    async update(id: number, data: Partial<RegisterUserDTO>): Promise<UserResponseDTO> {
        const { data: result, error } = await supabaseClient.from(TABLE).update(data).eq('id_usuario', id).select('*').single();
        if (error) {
            throw new Error(`Error actualizando usuario: ${error.message}`);
        }
        return result as UserResponseDTO;
    },

    async delete(id: number): Promise<void> {
        const { error } = await supabaseClient.from(TABLE).delete().eq('id_usuario', id);
        if (error) {
            throw new Error(`Error eliminando usuario: ${error.message}`);
        }
    }
}

export default UserRepository;