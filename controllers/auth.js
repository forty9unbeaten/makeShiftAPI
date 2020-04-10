import { User } from "../models";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userLogin = (request, response) => {
  const { username, password } = request.body;

  if (!username) {
    // no email or username included in request
    response.statusCode = 400;
    response.send({
      message: "Enter a username/email address",
      statusCode: response.statusCode,
    });
  }

  if (!password) {
    // no password included in request
    response.statusCode = 400;
    response.send({
      message: "Enter a password",
      statusCode: response.statusCode,
    });
  }

  // query database to get user information
  User.findOne({
    where: {
      [Op.or]: [{ username }, { email: username }],
    },
  })
    .then(async (user) => {
      // generate json web token if username/email and password exist
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "12h" }
        );
        response.send({
          username,
          token,
          statusCode: 200,
        });
      } else {
        // invalid credentials
        response.statusCode = 404;
        response.send({
          message: "Invalid username/email and/or password",
          statusCode: response.statusCode,
        });
      }
    })
    .catch((err) => {
      // login error
      response.statusCode = 400;
      response.send({
        message: "There was a problem logging in",
        statusCode: response.statusCode,
      });
    });
};

export const userLogout = (request, response) => {
  // token aithentication handled by middleware
  // only need to send 200 status code
  response.statusCode = 200;
  response.send({
    statusCode: response.statusCode,
  });
};
