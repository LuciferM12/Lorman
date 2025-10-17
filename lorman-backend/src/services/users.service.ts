import { RegisterUserDTO, UserDTO } from "../interfaces/users.interface";
import UserRepository from "../repositories/users.repository";
import { comparePasswords, hashPassword } from "../utils/encryption";
import { generateToken } from "../utils/jwt";

const UserService = {
    async registerUser(data: RegisterUserDTO): Promise<UserDTO> {
        const existing = await UserRepository.findByEmail(data.email);
        if (existing) {
            throw new Error("Email already in use");
        }
        const hashedPassword = await hashPassword(data.password_hash);
        const newUser = await UserRepository.create({
            ...data,
            password_hash: hashedPassword
        });

        return newUser;
    },

    async login(email: string, password: string) {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new Error("Invalid email or password");
        }

        const valid = await comparePasswords(password, user.password_hash);
        if (!valid) {
            throw new Error("Invalid email or password");
        }

        const token = generateToken({ id_usuario: user.id_usuario, email: user.email, rol: user.rol });
        return { token, user };
    }
}

export default UserService;