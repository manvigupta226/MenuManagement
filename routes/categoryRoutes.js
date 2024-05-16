const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Create new category
router.post('/', categoryController.createCategory);

// Get all category
router.get('/', categoryController.getAllCategories);

// Get category by name or ID
router.get('/:identifier', categoryController.getCategory);

// Update category attributes
router.put('/:categoryId', categoryController.updateCategory);

module.exports = router;
