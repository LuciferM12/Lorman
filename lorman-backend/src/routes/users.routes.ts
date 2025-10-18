import { Router } from "express";
import UsersController from "../controllers/users.controller";

const userRoutes = Router();

userRoutes.post("/register", UsersController.register);
userRoutes.post("/login", UsersController.login);

export default userRoutes;