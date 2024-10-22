// models/Customer.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Root = require('./Root');  // Import the Root model for foreign key association

// Define the Customer model
const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Auto-increment for customer ID
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,  // Customer name is required
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,  // Customer address is required
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,  // Customer phone number is required
  },
  whatsappNumber: {
    type: DataTypes.STRING,
    allowNull: true,  // WhatsApp number is optional
  },
  birthday: {
    type: DataTypes.DATEONLY,  // Store the birthday in YYYY-MM-DD format
    allowNull: true,  // Birthday is optional
  },
  rootId: {
    type: DataTypes.INTEGER,
    references: {
      model: Root,  // Reference the Root table
      key: 'id',
    },
    allowNull: false,  // Every customer must be associated with a root
  },
});

// Set up associations
Customer.belongsTo(Root, { foreignKey: 'rootId' });
Root.hasMany(Customer, { foreignKey: 'rootId' });

module.exports = Customer;
