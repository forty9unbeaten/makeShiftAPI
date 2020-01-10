import express from "express";
import bodyParser from "body-parser";
import swaggerDocRouter from "./SwaggerDocRouter";
import { database } from "./database";
import {
  sendAllProducts,
  sendRequestedProduct,
  addNewProduct
} from "./controllers";

const server = express();

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
server
  .set("port", process.env.PORT || 3000)
  .use(swaggerDocRouter, bodyParser.json());

// start server
server
  .post("/products", addNewProduct)
  .get("/products", sendAllProducts)
  .get("/products/:id", sendRequestedProduct)
  .listen(() => {
    console.log(`Server is now running on port ${server.get("port")}`);
  });
