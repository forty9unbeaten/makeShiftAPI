import express from "express";
import swaggerDocRouter from "./SwaggerDocRouter";

const server = express();
const port = process.env.PORT || 3000;

server.use("/", swaggerDocRouter);

const app = server.listen(port, () => {
  console.log(`Server is now listening on port ${port}`);
});
