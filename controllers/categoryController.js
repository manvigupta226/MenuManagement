const Category = require('../models/Category');


// To create category
exports.createCategory = async (req, res) => {
    try{
        // Extract data from the request body
        const {name, image, description, taxApplicability, tax, taxType} = req.body;

        // Validate the requires fields
        if(!name || !image || !description){
            return res.status(400).json({error: 'Name, image, and description are required fields'});
        }

        // Create a new category instance
        const category = new Category({
            name,
            image,
            description,
            taxApplicability: taxApplicability || false, //Default to false if not provided
            tax: tax || 0, //Default to zero if not provided
            taxType: taxType || null //Default to zero if not provided
        });

        //Save the category to the database
        await category.save();

        res.status(201).json({message: 'Category created successfully', category});


    }
    catch(err){
        res.status(500).json({error: err.message});
    }


};


// To get all the category
exports.getAllCategories = async (req, res) => {
    try {
        // Query all categories from the database
        const categories = await Category.findAll();

        // Send JSON response with categories
        res.status(200).json(categories);
    } catch (err) {
        // Handle errors
        console.error('Error fetching categories:', err);
        res.status(500).json({ error: 'An error occurred while fetching categories' });
    }
};


// To get category by name or ID along with its attributes
exports.getCategory = async (req, res) => {
    try {
        const { identifier } = req.params;

         // Define the where condition based on the type of identifier
        const whereCondition = isNaN(identifier) ? { name: identifier } : { id: identifier };

        // Query category by name or ID from the database
        const category = await Category.findOne({
            where: whereCondition
        });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Send JSON response with category
        res.status(200).json(category);
    } catch (err) {
        // Handle errors
        console.error('Error fetching category:', err);
        res.status(500).json({ error: 'An error occurred while fetching category' });
    }
};


// Update category attributes
exports.updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name, image, description, taxApplicability, tax, taxType } = req.body;

        // Find the category by ID
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Update category attributes
        category.name = name || category.name;
        category.image = image || category.image;
        category.description = description || category.description;
        category.taxApplicability = taxApplicability !== undefined ? taxApplicability : category.taxApplicability;
        category.tax = tax !== undefined ? tax : category.tax;
        category.taxType = taxType !== undefined ? taxType : category.taxType;

        // Save the updated category
        await category.save();

        // Send JSON response with updated category
        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (err) {
        // Handle errors
        console.error('Error updating category:', err);
        res.status(500).json({ error: 'An error occurred while updating category' });
    }
};