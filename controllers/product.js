import { Product, Rating, Comment } from "../models";

export const sendAllProducts = (request, response) => {
  let productCollection = {};

  // find all products in database
  Product.findAll().then((products) => {
    productCollection["products"] = products;
    if (productCollection.products.length === 0) {
      response.statusCode = 200;
      response.send({
        ...productCollection,
        statusCode: response.statusCode,
      });
      return;
    } else {
      // find all comments and filter by productId
      Comment.findAll()
        .then((comments) => {
          productCollection.products.forEach((product) => {
            product["comments"] = comments.filter(
              (comment) => comment.productId === product.productId
            );
          });
        })
        .then(() => {
          // find all ratings and filter by productId
          Rating.findAll().then((ratings) => {
            productCollection.products.forEach((product) => {
              product["ratings"] = ratings.filter(
                (rating) => rating.productId === product.productId
              );
            });
          });
        })
        .then(() => {
          response.statusCode = 200;
          response.send({
            ...productCollection,
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
    }
  });
};

export const sendRequestedProduct = (request, response) => {
  Product.findAll({
    where: {
      productId: request.params.id,
    },
  })
    .then((product) => {
      if (product[0]) {
        response.send({
          product: product[0],
          statusCode: response.statusCode,
        });
      } else {
        response.statusCode = 404;
        response.send({
          message: `Unable to find product with id of ${request.params.id}`,
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

export const addNewProduct = (request, response) => {
  const { productName, productDescription, productCategory } = request.body;
  let errors = [];

  if (!productName) {
    errors.push("Please enter a name for the product");
  }
  if (!productCategory) {
    errors.push("Please enter a category for the product");
  }
  if (!productDescription) {
    productDescription = "Enter a description";
  }

  if (errors.length !== 0) {
    response.statusCode = 400;
    response.send({
      message: errrors.join(", "),
      statusCode: response.statusCode,
    });
  } else {
    Product.create({
      productName,
      productDescription,
      productCategory,
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        response.statusCode = 400;
        response.send({
          message: error,
          statusCode: response.statusCode,
        });
      });
  }
};

export const deleteProduct = (request, response) => {
  Product.findAll({
    attributes: ["productName"],
    where: {
      id: request.params.id,
    },
  })
    .then((product) => {
      if (product[0]) {
        // product returned from SELECT query is an array of objects
        const productName = product[0].productName;

        Product.destroy({
          where: {
            id: request.params.id,
          },
        })
          .then(() => {
            response.send({
              productName,
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
      } else {
        response.statusCode = 404;
        response.send({
          message: `Unable to find product with an id of ${request.params.id}`,
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

export const updateProduct = (request, response) => {
  // create array of attributes that can be updated
  const attribsToUpdate = Object.keys(request.body);

  // confirm that the product exists
  Product.findAll({
    where: {
      id: request.params.id,
    },
  })
    .then((product) => {
      if (product[0]) {
        // update product in database
        Product.update(request.body, {
          fields: {
            ...attribsToUpdate,
          },
          where: {
            id: request.params.id,
          },
        })
          .then(() => {
            // send the updated product data back to user
            Product.findAll({
              where: {
                id: request.params.id,
              },
            })
              .then((product) => {
                response.send({
                  product: product[0],
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
          })
          .catch((error) => {
            (response.statusCode = 400),
              response.send({
                message: error,
                statusCode: response.statusCode,
              });
          });
      } else {
        // unable to locate product with specified ID
        response.statusCode = 404;
        response.send({
          message: `Unable to find a product with an id of ${request.params.id}`,
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
