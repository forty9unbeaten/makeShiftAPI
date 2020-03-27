import { User } from "../models";
import bcrypt from "bcrypt";

export const addNewUser = (request, response) => {
  const { password } = request.body;

  const saltRound = 10;
  bcrypt.hash(password, saltRound, (err, encrypt) => {
    if (err) {
      response.statusCode = 400;
      response.send({
        message: err,
        statusCode: response.statusCode
      });
    } else {
      User.create({
        ...request.body,
        password: encrypt
      })
        .then(result => {
          const {
            userId,
            username,
            firstName,
            lastName,
            email,
            bio,
            createdAt,
            updatedAt,
            photo
          } = result;
          response.send({
            user: {
              userId,
              username,
              firstName,
              lastName,
              email,
              bio,
              createdAt,
              updatedAt,
              photo
            },
            statusCode: 200
          });
        })
        .catch(error => {
          (response.statusCode = 400),
            response.send({
              message: error,
              statusCode: response.statusCode
            });
        });
    }
  });
};
