// models/DailySalesPlanning.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Import your sequelize instance

const DailySalesPlanning = sequelize.define('DailySalesPlanning', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  salesRepId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'SalesReps', // Assuming you have a SalesRep table
      key: 'id',
    },
  },
  vehicleId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Vehicles', // Assuming you have a Vehicle table
      key: 'id',
    },
  },
  // Other relevant fields...
}, {
  tableName: 'DailySalesPlannings', // Optional: explicitly specify table name
});

// Associations
DailySalesPlanning.associate = (models) => {
  DailySalesPlanning.hasMany(models.Invoice, { foreignKey: 'dailySalesPlanningId' });
};

module.exports = DailySalesPlanning;
