import express from "express";
import { addNewUser, deleteUser, getAllUsers } from "../controllers";
import { authenticateToken } from "../middleware";

const userRoutes = express.Router();

userRoutes.get("/users", getAllUsers);
userRoutes.post("/users", addNewUser);
userRoutes.delete("/users/:username", authenticateToken, deleteUser);

export default userRoutes;
