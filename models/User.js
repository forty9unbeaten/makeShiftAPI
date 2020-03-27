import { database } from "../database";
import sequelize from "sequelize";

export const User = database.define(
  "user",
  {
    userId: {
      primaryKey: true,
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: sequelize.STRING,
      allowNull: false
    },
    password: {
      type: sequelize.STRING,
      allowNull: false
    },
    firstName: {
      type: sequelize.STRING
    },
    lastName: {
      type: sequelize.STRING
    },
    email: {
      type: sequelize.STRING,
      allowNull: false
    },
    bio: {
      type: sequelize.STRING
    },
    createdAt: {
      type: sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
    },
    updatedAt: {
      type: sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
    },
    photo: sequelize.DataTypes.STRING
  },
  { indexes: [{ unique: true, fields: ["userId", "username", "email"] }] }
);
