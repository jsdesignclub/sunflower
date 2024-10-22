const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const ProductCategory = require('./ProductCategory');  // Import the ProductCategory model

// Define the Product model
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Automatically increment the Product ID
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,  // Product name must be provided
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),  // Price field with 2 decimal places (e.g., 10.99)
    allowNull: false,
  },
  discount: {
    type: DataTypes.DECIMAL(5, 2),  // Discount percentage (e.g., 15.50 for 15.5% discount)
    allowNull: true,  // Discount is optional, can be null if no discount
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,  // Quantity of the product
  },
  productCategoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: ProductCategory,  // Reference the ProductCategory table
      key: 'id',  // Foreign key for category
    },
    allowNull: false,  // Each product must belong to a category
  },
});

// Set up associations
Product.belongsTo(ProductCategory, { foreignKey: 'productCategoryId' });
ProductCategory.hasMany(Product, { foreignKey: 'productCategoryId' });

module.exports = Product;
