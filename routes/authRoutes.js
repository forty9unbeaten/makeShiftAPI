import express from "express";
import { userLogin } from "../controllers";

const authRoutes = express.Router();

authRoutes.post("/auth/login", userLogin);

export default authRoutes;
