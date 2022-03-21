import { Sequelize } from "sequelize";

const {
  MYSQL_HOST: MYSQL_HOST,
  MYSQL_DB: DB,
  MYSQL_USER: USER,
  MYSQL_ROOT_PASSWORD: PASSWORD,
} = process.env;

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  dialect: "mysql",
  host: MYSQL_HOST,
  port: 3306,

  // pool: {
  //     max: MAX,
  //     min: dbConfig.pool.min,
  //     acquire: dbConfig.pool.acquire,
  // idle: 1
  // },
});

export default sequelize;
