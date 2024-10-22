// models/Invoice.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Import your sequelize instance

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dailySalesPlanningId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'DailySalesPlannings', // Name of the DailySalesPlanning table
      key: 'id',
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'Invoices', // Optional: explicitly specify table name
});

// Associations
Invoice.associate = (models) => {
  Invoice.belongsTo(models.DailySalesPlanning, { foreignKey: 'dailySalesPlanningId' });
  Invoice.hasMany(models.SalesTransaction, { foreignKey: 'invoiceId' });
};

module.exports = Invoice;
