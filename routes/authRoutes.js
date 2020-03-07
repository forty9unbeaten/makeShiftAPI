import express from "express";
import { userLogin, userLogout } from "../controllers";

const authRoutes = express.Router();

authRoutes.post("/auth/login", userLogin).get("/auth/logout", userLogout);

export default authRoutes;
