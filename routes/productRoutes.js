import express from "express";
import {
  addNewProduct,
  sendAllProducts,
  sendRequestedProduct,
  updateProduct,
  deleteProduct,
} from "../controllers";
import { authenticateToken } from "../middleware";

const productRoutes = express.Router();

productRoutes
  .post("/products", authenticateToken, addNewProduct)
  .get("/products", sendAllProducts)
  .get("/products/:id", sendRequestedProduct)
  .patch("/products/:id", authenticateToken, updateProduct)
  .delete("/products/:id", authenticateToken, deleteProduct);

export default productRoutes;
