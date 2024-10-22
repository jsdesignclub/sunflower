const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Define the User model and prevent pluralization of the table name
const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,  // This field is required (NOT NULL)
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,  // This field is required (NOT NULL)
  },
}, {
  freezeTableName: true,  // Prevent Sequelize from pluralizing the table name
});

// Sync the model with the database and create the table if it doesn't exist
User.sync();

module.exports = User;

