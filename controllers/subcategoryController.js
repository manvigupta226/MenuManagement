const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');


// Create SubCategory
exports.createSubCategory = async (req, res) => {
    try {
        // Extract data from the request body
        const { name, image, description, taxApplicability, tax, taxType, categoryId } = req.body;

        // Validate the required fields
        if (!name || !image || !description || !categoryId) {
            return res.status(400).json({ error: 'Name, image, description, and categoryId are required fields' });
        }

        // Check if the associated category exists
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Create a new subcategory instance
        const subCategory = new SubCategory({
            name,
            image,
            description,
            taxApplicability: typeof taxApplicability !== 'undefined' ? taxApplicability : category.taxApplicability,
            tax: typeof tax !== 'undefined' ? tax : category.tax,
            taxType: taxType || category.taxType,
            CategoryId: categoryId
        });

 // Save the subcategory to the database
 await subCategory.save();

 res.status(201).json({ message: 'SubCategory created successfully', subCategory });
} catch (err) {
// Handle errors
console.error('Error creating subcategory:', err);
res.status(500).json({ error: 'An error occurred while creating the subcategory' });
}
};

// Get all SubCategories
exports.getAllSubcategories = async (req, res) => {
    try {
        // Query all subcategories from the database
        const subcategories = await SubCategory.findAll();

        // Send JSON response with subcategories
        res.status(200).json(subcategories);
    } catch (err) {
        // Handle errors
        console.error('Error fetching subcategories:', err);
        res.status(500).json({ error: 'An error occurred while fetching subcategories' });
    }
};



// Get subcategories by category
exports.getSubcategoriesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Query subcategories by category ID from the database
        const subcategories = await SubCategory.findAll({
            where: { CategoryId: categoryId }
        });

        // Send JSON response with subcategories
        res.status(200).json(subcategories);
    } catch (err) {
        // Handle errors
        console.error('Error fetching subcategories by category:', err);
        res.status(500).json({ error: 'An error occurred while fetching subcategories by category' });
    }
};



// Get subcategory by name or ID
exports.getSubcategory = async (req, res) => {
    try {
        const { identifier } = req.params;

        // Define the where condition based on the type of identifier
        const whereCondition = isNaN(identifier) ? { name: identifier } : { id: identifier };

        // Query subcategory by name or ID from the database
        const subcategory = await SubCategory.findOne({
            where: whereCondition
        });

        if (!subcategory) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }

        // Send JSON response with subcategory
        res.status(200).json(subcategory);
    } catch (err) {
        // Handle errors
        console.error('Error fetching subcategory:', err);
        res.status(500).json({ error: 'An error occurred while fetching subcategory' });
    }
};



// Update sub-category attributes
exports.updateSubcategory = async (req, res) => {
    try {
        const { subcategoryId } = req.params;
        const { name, image, description, taxApplicability, tax, taxType } = req.body;

        // Find the sub-category by ID
        const subcategory = await SubCategory.findByPk(subcategoryId);

        if (!subcategory) {
            return res.status(404).json({ error: 'Sub-category not found' });
        }

        // Update sub-category attributes
        subcategory.name = name || subcategory.name;
        subcategory.image = image || subcategory.image;
        subcategory.description = description || subcategory.description;
        subcategory.taxApplicability = taxApplicability !== undefined ? taxApplicability : subcategory.taxApplicability;
        subcategory.tax = tax !== undefined ? tax : subcategory.tax;
        subcategory.taxType = taxType !== undefined ? taxType : subcategory.taxType;

        // Save the updated sub-category
        await subcategory.save();

        // Send JSON response with updated sub-category
        res.status(200).json({ message: 'Sub-category updated successfully', subcategory });
    } catch (err) {
        // Handle errors
        console.error('Error updating sub-category:', err);
        res.status(500).json({ error: 'An error occurred while updating sub-category' });
    }
};