import sequelize from "sequelize";
import { database } from "../database";
import { Product } from ".";

export const Rating = database.define(
  "rating",
  {
    ratingId: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    productId: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "productId",
      },
    },
    username: {
      type: sequelize.STRING,
      allowNull: false,
    },
    rating: {
      type: sequelize.INTEGER,
    },
  },
  { timestamps: false, indexes: [{ unique: true, fields: ["ratingId"] }] }
);
