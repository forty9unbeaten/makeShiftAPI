import { Product } from "../models";
import { sqlAttributes } from "./constants";

export const sendAllProducts = (request, response) => {
  Product.findAll({
    attributes: sqlAttributes
  })
    .then(products => {
      response.send({
        products,
        statusCode: response.statusCode
      });
    })
    .catch(error => {
      response.statusCode = 400;
      response.send({
        message: error,
        statusCode: response.statusCode
      });
    });
};

export const sendRequestedProduct = (request, response) => {
  Product.findAll({
    attributes: sqlAttributes,
    where: {
      id: request.params.id
    }
  })
    .then(product => {
      if (product[0]) {
        response.send({
          product,
          statusCode: response.statusCode
        });
      } else {
        response.statusCode = 404;
        response.send({
          message: `Unable to find product with id of ${request.params.id}`,
          statusCode: response.statusCode
        });
      }
    })
    .catch(error => {
      response.statusCode = 400;
      response.send({
        message: error,
        statusCode: response.statusCode
      });
    });
};

export const addNewProduct = (request, response) => {
  const { productName, productCategory } = request.body;
  const errors = [];

  // request body validation
  if (!productName) {
    errors.push(`Please specify a product name`);
  } else if (!productCategory) {
    errors.push("Please specify a product Category");
  }

  if (errors.length > 0) {
    response.statusCode = 400;
    response.send({
      message: errors,
      statusCode: response.statusCode
    });
  } else {
    Product.create({ productName, productCategory })
      .then(result => {
        response.send({
          product: {
            id: result.id,
            productName: result.productName,
            productDescription: result.productDescription,
            productImgs: result.productImgs,
            productCategory: result.productCategory,
            ratingsCount: result.ratingsCount,
            ratings: result.ratings
          },
          statusCode: response.statusCode
        });
      })
      .catch(error => {
        response.statusCode = 400;
        response.send({
          message: error,
          statusCode: response.statusCode
        });
      });
  }
};

export const deleteProduct = (request, response) => {
  Product.findAll({
    attributes: ["productName"],
    where: {
      id: request.params.id
    }
  }).then(product => {
    if (product[0]) {
      // product returned from SELECT query is an array of objects
      const productName = product[0].productName;

      Product.destroy({
        where: {
          id: request.params.id
        }
      })
        .then(() => {
          response.send({
            productName,
            statusCode: response.statusCode
          });
        })
        .catch(error => {
          response.statusCode = 400;
          response.send({
            message: error,
            statusCode: response.statusCode
          });
        });
    } else {
      response.statusCode = 404;
      response.send({
        message: `Unable to find product with an id of ${request.params.id}`,
        statusCode: response.statusCode
      });
    }
  });
};
