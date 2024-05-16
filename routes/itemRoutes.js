const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Create a new item
router.post('/', itemController.createItem);

// Get all items
router.get('/', itemController.getAllItems);

// Get items by category
router.get('/category/:categoryId', itemController.getItemsByCategory);

// Get items by sub-category
router.get('/subcategory/:subcategoryId', itemController.getItemsBySubcategory);

// Get item by name or ID
router.get('/:identifier', itemController.getItem);

// Update item attributes
router.put('/:itemId', itemController.updateItem);

// Search for items by name
router.get('/search', itemController.searchItemsByName);


module.exports = router;
