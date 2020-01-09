import { Product } from "../models";
import { sqlAttributes } from "./constants";

export const sendAllProducts = (request, response) => {
  try {
    Product.findAll({
      attributes: sqlAttributes
    }).then(products => {
      response.send(
        JSON.stringify({
          products,
          statusCode: 200
        })
      );
    });
  } catch (error) {
    response.send(
      JSON.stringify({
        message: error,
        statusCode: 400
      })
    );
  }
};

export const sendRequestedProduct = (request, response) => {
  try {
    Product.findAll({
      attributes: sqlAttributes,
      where: {
        id: request.params.id
      }
    }).then(product => {
      if (product[0]) {
        response.send(
          JSON.stringify({
            product,
            statusCode: 200
          })
        );
      } else {
        response.send(
          JSON.stringify({
            message: `Unable to find product with id of ${request.params.id}`,
            statusCode: 400
          })
        );
      }
    });
  } catch (error) {
    response.send(
      JSON.stringify({
        message: error,
        statusCode: 400
      })
    );
  }
};
