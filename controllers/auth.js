import { User } from "../models";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userLogin = (request, response) => {
  const { username, password } = request.body;
  User.findOne({
    where: {
      [Op.or]: [{ username }, { email: username }]
    }
  })
    .then(async user => {
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        response.send({
          username,
          token,
          statusCode: 200
        });
      } else {
        response.statusCode = 404;
        response.send({
          message: "Invalid username/email and/or password",
          statusCode: response.statusCode
        });
      }
    })
    .catch(err => {
      response.statusCode = 400;
      response.send({
        message: "There was a problem logging in",
        statusCode: response.statusCode
      });
    });
};
