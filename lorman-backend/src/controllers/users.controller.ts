import { Request, Response } from "express";
import UserService from "../services/users.service";
import { registerUserSchema } from "../interfaces/users.interface";

const UsersController = {
    async register(req: Request, res: Response) {
        try {
            const parsed = registerUserSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ error: "Solicitud de datos inválida", details: parsed.error.flatten().fieldErrors })
            }

            const newUser = await UserService.registerUser(parsed.data)
            res.status(201).json({ message: "Usuario registrado exitosamente", user: newUser });

        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Correo electrónico y contraseña son requeridas" });
            }
            const { token, user } = await UserService.login(email, password);
            res.status(200).json({ message: "Inicio de sesión exitoso", token, user });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async getUserByEmail(req: Request, res: Response) {
        try {
            const { email } = req.params;
            if (!email) {
                return res.status(400).json({ error: "Correo electrónico es requerido" });
            }
            const user = await UserService.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            res.status(200).json({ user });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async updateUser(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id);
            const updateData = req.body;
            const updatedUser = await UserService.updateUser(userId, updateData);
            res.status(200).json({ message: "Usuario actualizado exitosamente", user: updatedUser });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default UsersController;