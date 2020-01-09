import express from "express";
import swaggerDocRouter from "./SwaggerDocRouter";
import { database } from "./database";
import { sendAllProducts, sendRequestedProduct } from "./controllers";

const server = express();
const port = process.env.PORT || 3000;

// connect to database
database
  .authenticate()
  .then(() => {
    console.log("Database has connected");
  })
  .catch(err => {
    console.log(`Failed to connect to database *** ERROR: ${err}`);
  });

// start server
server
  .use("/", swaggerDocRouter)
  .get("/products", sendAllProducts)
  .get("/products/:id", sendRequestedProduct)
  .listen(port, () => {
    console.log(`Server is now listening on port ${port}`);
  });
