import { RegisterUserDTO, UserResponseDTO, UserResponseSchema } from "../interfaces/users.interface";
import UserRepository from "../repositories/users.repository";
import { comparePasswords, hashPassword } from "../utils/encryption";
import { generateToken } from "../utils/jwt";

const UserService = {
    async registerUser(data: RegisterUserDTO): Promise<UserResponseDTO> {
        const existing = await UserRepository.findByEmail(data.email);
        if (existing) {
            throw new Error("El correo electrónico ya está en uso");
        }
        const hashedPassword = await hashPassword(data.password_hash);
        const newUser = await UserRepository.create({
            ...data,
            password_hash: hashedPassword
        });

        return newUser;
    },

    async login(email: string, password: string): Promise<{ token: string; user: UserResponseDTO }> {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new Error("Correo electrónico o contraseña inválidos");
        }

        const valid = await comparePasswords(password, user.password_hash);
        if (!valid) {
            throw new Error("Correo electrónico o contraseña inválidos");
        }

        const userWithoutPassword = UserResponseSchema.parse(user);

        const token = generateToken({ id_usuario: user.id_usuario, email: user.email, rol: user.rol });
        return { token, user: userWithoutPassword };
    },

    async getUserByEmail(email: string): Promise<UserResponseDTO | null> {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            return null;
        }
        return UserResponseSchema.parse(user);
    },

    async updateUser(id: number, data: Partial<RegisterUserDTO>): Promise<UserResponseDTO> {
        const updatedUser = await UserRepository.update(id, data);
        return UserResponseSchema.parse(updatedUser);
    },

    async listUsers(limit = 100, offset = 0): Promise<UserResponseDTO[]> {
        const users = await UserRepository.list(limit, offset);
        return users.map(user => UserResponseSchema.parse(user));
    }
};
export default UserService;