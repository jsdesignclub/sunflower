
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Define the SalesRep model
const SalesRep = sequelize.define('SalesRep', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Auto-increment for rep ID
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,  // Rep name is required
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,  // Rep address is required
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,  // Rep phone number is required
  },
  experienceLevel: {
    type: DataTypes.STRING,
    allowNull: false,  // Level of experience is required
  },
});

module.exports = SalesRep;
