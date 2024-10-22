// models/SalesTransaction.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Import your sequelize instance

const SalesTransaction = sequelize.define('SalesTransaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Products', // Name of the Product table
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  invoiceId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Invoices', // Name of the Invoice table
      key: 'id',
    },
  },
}, {
  tableName: 'SalesTransactions', // Optional: explicitly specify table name
});

// Associations
SalesTransaction.associate = (models) => {
  SalesTransaction.belongsTo(models.Product, { foreignKey: 'productId' });
  SalesTransaction.belongsTo(models.Invoice, { foreignKey: 'invoiceId' });
};

module.exports = SalesTransaction;
