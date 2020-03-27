import { database } from "../database";
import sequelize from "sequelize";

export const Product = database.define(
  "product",
  {
    productId: {
      type: sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    productName: {
      type: sequelize.STRING,
      allowNull: false
    },
    productDescription: {
      type: sequelize.STRING,
      defaultValue: "Enter a description"
    },
    productImgs: {
      type: sequelize.ARRAY(sequelize.STRING)
    },
    productCategory: {
      type: sequelize.STRING,
      allowNull: false
    },
    username: {
      type: sequelize.STRING,
      allowNull: false
    }
  },
  { timestamps: false, indexes: [{ unique: true, fields: ["productId"] }] }
);
