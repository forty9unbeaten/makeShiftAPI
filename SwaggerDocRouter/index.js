import swaggerUi from "swagger-ui-express";
import express from "express";
import YAML from "yamljs";

const openApiSpecs = YAML.load("./specification.yaml");
const swaggerDocRouter = express.Router();

swaggerDocRouter
  .get("/specification.json", (request, response) => {
    response.send(openApiSpecs);
  })
  .use("/", swaggerUi.serve, swaggerUi.setup(openApiSpecs));

export default swaggerDocRouter;
