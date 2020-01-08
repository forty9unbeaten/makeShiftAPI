import swaggerUi from "swagger-ui-express";
import express from "express";
import YAML from "yamljs";

const openApiSpecs = YAML.load("./specification.yaml");
const swaggerDocRouter = express.Router();

swaggerDocRouter
  .use("/documentation", swaggerUi.serve, swaggerUi.setup(openApiSpecs))
  // redirect to documentation page
  .get("/", (request, response) => {
    response.redirect("/documentation");
  })
  .get("/specification.json", (request, response) => {
    response.send(openApiSpecs);
  });

export default swaggerDocRouter;
