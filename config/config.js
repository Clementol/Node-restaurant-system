import "dotenv/config"

const DbConfig =  {
  "development": {
    "username": `${process.env.MYSQL_USER}`,
    "password": `${process.env.MYSQL_ROOT_PASSWORD}`,
    "database": `${process.env.MYSQL_DB}`,
    "host": "127.0.0.1",
    "dialect": `${process.env.DIALECT}`,
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",

  }
}

module.exports = DbConfig;