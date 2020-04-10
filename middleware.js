import * as jwt from "jsonwebtoken";

export const authenticateToken = async (request, response, next) => {
  // parse token from header
  const authHeaders = request.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];

  if (token && jwt.verify(token, process.env.JWT_SECRET)) {
    // valid token
    next();
  } else {
    // non-existant or invalid token
    response.statusCode = 401;
    response.send({
      message: "Unauthorized to make request",
      statusCode: response.statusCode,
    });
  }
};
