// models/Vehicle.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Define the Vehicle model
const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Auto-increment for vehicle ID
  },
  vehicleNumber: {
    type: DataTypes.STRING,
    allowNull: false,  // Vehicle number is required
  },
  vehicleName: {
    type: DataTypes.STRING,
    allowNull: false,  // Vehicle name is required
  },
});

module.exports = Vehicle;
