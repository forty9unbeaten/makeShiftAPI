import { database } from "../database";
import sequelize from "sequelize";

export const Comment = database.define(
  "comment",
  {
    commentId: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productId: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    username: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    comment: {
      type: sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: sequelize.DATE,
      defaultValue: sequelize.NOW,
      allowNull: false,
    },
  },
  { timestamps: false, indexes: [{ unique: true, fields: ["commentId"] }] }
);
