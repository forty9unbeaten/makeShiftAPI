import express from "express";
import {
  addNewProduct,
  sendAllProducts,
  sendRequestedProduct,
  updateProduct,
  deleteProduct
} from "../controllers";

const productRoutes = express.Router();

productRoutes
  .post("/products", addNewProduct)
  .get("/products", sendAllProducts)
  .get("/products/:id", sendRequestedProduct)
  .patch("/products/:id", updateProduct)
  .delete("/products/:id", deleteProduct);

export default productRoutes;
