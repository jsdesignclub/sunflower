// db.js (Database connection setup)
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance (connects to the MySQL database)
const sequelize = new Sequelize('sunflower_marketing', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',  // We are using MySQL as the database
});

module.exports = sequelize;
