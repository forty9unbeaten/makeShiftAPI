import express from "express";
import { userLogin, userLogout } from "../controllers";
import { authenticateToken } from "../middleware";

const authRoutes = express.Router();

authRoutes
  .post("/auth/login", userLogin)
  .get("/auth/logout", authenticateToken, userLogout);

export default authRoutes;
