import { database } from "../database";
import sequelize from "sequelize";

export const Product = database.define("product", {
  productName: {
    type: sequelize.STRING
  },
  productDescription: {
    type: sequelize.STRING
  },
  productImgs: {
    type: sequelize.ARRAY(sequelize.STRING)
  },
  productCategory: {
    type: sequelize.STRING
  },
  ratingsCount: {
    type: sequelize.INTEGER
  },
  ratings: {
    type: sequelize.ARRAY(sequelize.INTEGER)
  }
});
