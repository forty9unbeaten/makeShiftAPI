import { Sequelize } from "sequelize";

const DBURI = `postgres://dxwplfdyplfgtj:e84d9dcd96bb460f24fce3cdf53f0f03e0fc66eb6099ba77dbd53892af407357@ec2-174-129-32-230.compute-1.amazonaws.com:5432/d1gbqtahv8iulr`;

export const database = new Sequelize(DBURI, {
  dialect: `postgres`,
  dialectOptions: {
    ssl: true
  }
});
