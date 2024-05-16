// associations.js
const Category = require('./models/Category');
const SubCategory = require('./models/SubCategory');
const Item = require('./models/Item');


// Define associations
Category.hasMany(SubCategory, { foreignKey: 'CategoryId', as: 'subCategories' });
SubCategory.belongsTo(Category, { foreignKey: 'CategoryId', as: 'category' });

SubCategory.hasMany(Item, { foreignKey: 'SubCategoryId', as: 'items' });
Item.belongsTo(SubCategory, { foreignKey: 'SubCategoryId', as: 'subCategory' });


module.exports = { Category, SubCategory, Item }; // Export models for use in other files
