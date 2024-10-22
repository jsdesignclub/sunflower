const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Define the Root model
const Root = sequelize.define('Root', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Auto-increment for root ID
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,  // Root name is required
  },
});

module.exports = Root;
