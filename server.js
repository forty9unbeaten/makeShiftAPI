import express from "express";
import bodyParser from "body-parser";
import swaggerDocRouter from "./SwaggerDocRouter";
import { database } from "./database";
import cors from "cors";
import {
  sendAllProducts,
  sendRequestedProduct,
  addNewProduct,
  deleteProduct,
  updateProduct
} from "./controllers";

const server = express();
const PORT = process.env.PORT || 3000;

// connect to database
database
  .authenticate()
  .then(() => {
    console.log("Database has connected");
  })
  .catch(err => {
    console.log(`Failed to connect to database *** ERROR: ${err}`);
  });

// server setup
server.use(swaggerDocRouter, bodyParser.json(), cors());

// start server
server
  .post("/products", addNewProduct)
  .get("/products", sendAllProducts)
  .get("/products/:id", sendRequestedProduct)
  .patch("/products/:id", updateProduct)
  .delete("/products/:id", deleteProduct)
  .listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
  });
