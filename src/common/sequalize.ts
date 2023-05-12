import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT ? Number.parseInt(process.env.POSTGRES_PORT) : 5432,
  password: process.env.POSTGRES_PASSWORD,
  username: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DATABASE,
});
