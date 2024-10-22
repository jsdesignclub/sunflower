// models/ProductCategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Define the ProductCategory model
const ProductCategory = sequelize.define('ProductCategory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Ensure category names are unique
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,  // Optional description field
  },
});

// Sync the database and predefine the 9 categories
sequelize.sync({ alter: true }).then(async () => {
  try {
    // Array of predefined categories
    const categories = [
      { name: 'Dish Wash', description: 'Products for washing dishes' },
      { name: 'Car Wash', description: 'Products for cleaning cars' },
      { name: 'T. B. C.', description: 'Toilet bowl cleaner' },
      { name: 'Tile Cleaner', description: 'Products for cleaning tiles' },
      { name: 'Hand Wash', description: 'Products for washing hands' },
      { name: 'Glass Cleaner', description: 'Products for cleaning glass surfaces' },
      { name: 'Clorexy', description: 'Disinfectant products' },
      { name: 'Freenol', description: 'Products for surface disinfection' },
      { name: 'Air Freshener', description: 'Products for air freshening' },
    ];

    // Loop through categories and create them if they don't exist
    for (const category of categories) {
      await ProductCategory.findOrCreate({
        where: { name: category.name },
        defaults: category,  // Only create if it doesn't exist
      });
    }
    console.log('Predefined categories have been inserted.');
  } catch (error) {
    console.error('Error inserting categories:', error);
  }
});

module.exports = ProductCategory;
