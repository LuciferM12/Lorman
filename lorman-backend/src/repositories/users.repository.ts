import { supabaseClient } from "../config/supabaseClient";
import { RegisterUserDTO, UserDTO } from "../interfaces/users.interface";

const TABLE = "usuarios";

const UserRepository = {
    async create(data: RegisterUserDTO): Promise<UserDTO> {
        const { data: result, error } = await supabaseClient.from(TABLE).insert([data]).select('*').single();
        if (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
        return result as UserDTO;
    },

    async findById(id: number): Promise<UserDTO | null> {
        const { data, error } = await supabaseClient.from(TABLE).select('*').eq('id_usuario', id).single();
        if (error) {
            if (error.code === 'PGRST116') { // No rows found
                return null;
            }
            throw new Error(`Error finding user by ID: ${error.message}`);
        }
        return data as UserDTO;
    },

    async findByEmail(email: string): Promise<UserDTO | null> {
        const { data, error } = await supabaseClient.from(TABLE).select('*').eq('email', email).single();
        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            throw new Error(`Error finding user by email: ${error.message}`);
        }
        return data as UserDTO;
    },

    async list(limit = 100, offset = 0): Promise<UserDTO[]> {
        const { data, error } = await supabaseClient.from(TABLE).select('*').range(offset, offset + limit - 1);
        if (error) {
            throw new Error(`Error listing users: ${error.message}`);
        }
        return data as UserDTO[];
    },

    async update(id: number, data: Partial<RegisterUserDTO>): Promise<UserDTO> {
        const { data: result, error } = await supabaseClient.from(TABLE).update(data).eq('id_usuario', id).select('*').single();
        if (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
        return result as UserDTO;
    },

    async delete(id: number): Promise<void> {
        const { error } = await supabaseClient.from(TABLE).delete().eq('id_usuario', id);
        if (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}

export default UserRepository;