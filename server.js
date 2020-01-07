const express = require("express");
const server = express();

const app = server.listen(3000, () => {
  console.log("Server is now listening on port 3000");
});
