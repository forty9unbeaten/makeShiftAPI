import express from "express";
import { addNewUser } from "../controllers";

const userRoutes = express.Router();

userRoutes.post("/users", addNewUser);

export default userRoutes;
