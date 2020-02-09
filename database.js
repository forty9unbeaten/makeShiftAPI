import { Sequelize } from "sequelize";
import dotenv from "dotenv";

const envConfig = dotenv.config();

export const database = new Sequelize(process.env.DATABASE_URL, {
  dialect: `postgres`,
  dialectOptions: {
    ssl: true
  }
});
