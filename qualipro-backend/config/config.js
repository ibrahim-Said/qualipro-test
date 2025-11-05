require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'qualipro',
    password: process.env.DB_PASSWORD || 'qualipro_pass',
    database: process.env.DB_NAME || 'qualipro_db',
    host: process.env.DB_HOST || 'qualipro',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql', // ← This line is crucial!
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql', // ← This line is crucial!
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql', // ← This line is crucial!
    dialectOptions: {
      bigNumberStrings: true
    }
  }
};