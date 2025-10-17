import { Request, Response } from "express";
import UserService from "../services/users.service";
import { registerUserSchema } from "../interfaces/users.interface";

const UsersController = {
    async register(req: Request, res: Response) {
        try {
            const parsed = registerUserSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ error: "Invalid request data", details: parsed.error.flatten().fieldErrors })
            }

            const newUser = await UserService.registerUser(parsed.data)
            res.status(201).json({ message: "User registered successfully", user: newUser });

        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Email and password are required" });
            }

            const { token, user } = await UserService.login(email, password);
            res.status(200).json({ message: "Login successful", token, user });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default UsersController;