import express from "express";
import bodyParser from "body-parser";
import swaggerDocRouter from "./SwaggerDocRouter";
import { productRoutes } from "./routes";
import { database } from "./database";
import * as models from "./models";
import cors from "cors";

const server = express();
const PORT = process.env.PORT || 8080;

// connect to database
database
  .authenticate()
  .then(() => {
    models.Product.sync();
    models.User.sync();
    models.Rating.sync();
    models.Comment.sync();
  })
  .then(() => {
    console.log("Database has connected");
  })
  .catch(err => {
    console.log(`Failed to connect to database *** ERROR: ${err}`);
  });

// server setup
server.use(swaggerDocRouter, productRoutes, bodyParser.json(), cors());

// start server
server.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
