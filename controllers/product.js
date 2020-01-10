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
          product: product[0],
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
  const { productName, productCategory, productDescription } = request.body;
  const errors = [];

  // request body validation
  if (!productName) {
    errors.push(`Please specify a product name`);
  } else if (!productCategory) {
    errors.push("Please specify a product Category");
  }

  // set product description to default value
  if (!productDescription) {
    productDescription = `Enter a description`;
  }

  if (errors.length > 0) {
    response.statusCode = 400;
    response.send({
      message: errors,
      statusCode: response.statusCode
    });
  } else {
    Product.create({ productName, productCategory, productDescription })
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
  })
    .then(product => {
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
    })
    .catch(error => {
      response.statusCode = 400;
      response.send({
        message: error,
        statusCode: response.statusCode
      });
    });
};

export const updateProduct = (request, response) => {
  // create array of attributes that can be updated
  const attribsToUpdate = Object.keys(request.body);

  // confirm that the product exists
  Product.findAll({
    where: {
      id: request.params.id
    }
  })
    .then(product => {
      if (product[0]) {
        // update product in database
        Product.update(request.body, {
          fields: {
            ...attribsToUpdate
          },
          where: {
            id: request.params.id
          }
        })
          .then(() => {
            // send the updated product data back to user
            Product.findAll({
              attributes: sqlAttributes,
              where: {
                id: request.params.id
              }
            })
              .then(product => {
                response.send({
                  product: product[0],
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
          })
          .catch(error => {
            (response.statusCode = 400),
              response.send({
                message: error,
                statusCode: response.statusCode
              });
          });
      } else {
        // unable to locate product with specified ID
        response.statusCode = 404;
        response.send({
          message: `Unable to find a product with an id of ${request.params.id}`,
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
