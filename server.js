import express from "express";
import swaggerDocRouter from "./SwaggerDocRouter";
import { database } from "./database";

const server = express();
const port = process.env.PORT || 3000;

// connect to database
database
  .authenticate()
  .then(() => {
    console.log("Database has connected");
  })
  .catch(err => {
    console.log(`Failed to connect to database...error: ${err}`);
  });

// start server
server.use("/", swaggerDocRouter).listen(port, () => {
  console.log(`Server is now listening on port ${port}`);
});
