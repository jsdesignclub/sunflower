// models/SalesTarget.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const SalesRep = require('./SalesRep');  // Import the SalesRep model for association

// Define the SalesTarget model
const SalesTarget = sequelize.define('SalesTarget', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Auto-increment for sales target ID
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,  // Year is required
  },
  month: {
    type: DataTypes.STRING,
    allowNull: false,  // Month is required
  },
  target: {
    type: DataTypes.FLOAT,  // Target amount (e.g., sales target for the month)
    allowNull: false,
  },
  actual: {
    type: DataTypes.FLOAT,  // Actual sales achieved
    allowNull: false,
  },
  remarks: {
    type: DataTypes.STRING,  // Additional comments or remarks
    allowNull: true,
  },
  salesRepId: {
    type: DataTypes.INTEGER,
    references: {
      model: SalesRep,  // Reference to SalesRep table
      key: 'id',
    },
    allowNull: false,  // Every target is associated with a sales rep
  },
});

// Set up associations
SalesTarget.belongsTo(SalesRep, { foreignKey: 'salesRepId' });
SalesRep.hasMany(SalesTarget, { foreignKey: 'salesRepId' });

module.exports = SalesTarget;
