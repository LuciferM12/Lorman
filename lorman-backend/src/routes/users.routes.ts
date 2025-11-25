import { Router } from "express";
import UsersController from "../controllers/users.controller";

const userRoutes = Router();

userRoutes.post("/register", UsersController.register);
userRoutes.post("/login", UsersController.login);
userRoutes.get("/email/:email", UsersController.getUserByEmail);
userRoutes.put("/:id", UsersController.updateUser);
userRoutes.get("/", UsersController.listUsers);

export default userRoutes;