require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNSME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_DBNAME_DEV,
    host: process.env.DB_HOST_DEV,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USERNSME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_DBNAME_DEV,
    host: process.env.DB_HOST_DEV,
    dialect: 'postgres',
  },
};
