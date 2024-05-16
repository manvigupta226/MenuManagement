const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');

// Create a new subcategory
router.post('/', subcategoryController.createSubCategory);

// Get all subcategories
router.get('/', subcategoryController.getAllSubcategories);

// Get subcategories by category
router.get('/category/:categoryId', subcategoryController.getSubcategoriesByCategory);

// Get subcategory by name or ID
router.get('/:identifier', subcategoryController.getSubcategory);

// Update sub-category attributes
router.put('/:subcategoryId', subcategoryController.updateSubcategory);

module.exports = router;
