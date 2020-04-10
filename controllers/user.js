import { User } from "../models";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

export const getAllUsers = (request, response) => {
  // find all users and exclude password entry
  User.findAll({
    attributes: {
      exclude: ["password"],
    },
  })
    .then((result) => {
      // successful query, send results
      response.statusCode = 200;
      response.send({
        users: result,
        statusCode: response.statusCode,
      });
    })
    .catch((error) => {
      response.statusCode = 400;
      response.send({
        message: error,
        statusCode: response.statusCode,
      });
    });
};

export const addNewUser = (request, response) => {
  const { password } = request.body;

  const saltRound = 10;
  bcrypt.hash(password, saltRound, (err, encrypt) => {
    if (err) {
      // problem hashing password
      response.statusCode = 400;
      response.send({
        message: err,
        statusCode: response.statusCode,
      });
    } else {
      // successful hashing, attempt to create new user record
      User.findOrCreate({
        where: {
          [Op.or]: [
            { username: request.body.username },
            { email: request.body.email },
          ],
        },
        defaults: {
          ...request.body,
          password: encrypt,
        },
      })
        .then((newUser, created) => {
          if (created) {
            // successful user record creation
            const { password, ...safeToSendProps } = newUser;
            response.statusCode = 200;
            response.send({
              user: safeToSendProps,
              statusCode: response.statusCode,
            });
          } else {
            // user not created because username or email already exists
            (response.statusCode = 400),
              response.send({
                message: "Username or email is already taken",
                statusCode: response.statusCode,
              });
          }
        })
        .catch((error) => {
          response.statusCode = 400;
          response.send({
            message: error,
            statusCode: response.statusCode,
          });
        });
    }
  });
};

export const deleteUser = (request, response) => {
  // attempt to delete record from database
  User.destroy({
    where: {
      username: request.params.username,
    },
  })
    .then((result) => {
      if (result) {
        // successful deletion
        response.statusCode = 200;
        response.send({
          username: request.params.username,
          statusCode: response.statusCode,
        });
      } else {
        // unsuccessful deletion, user record not present
        response.statusCode = 404;
        response.send({
          message: "User not found",
          statusCode: response.statusCode,
        });
      }
    })
    .catch((error) => {
      response.statusCode = 400;
      response.send({
        message: error,
        statusCode: response.statusCode,
      });
    });
};
