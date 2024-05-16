const Item = require('../models/Item');
const SubCategory = require('../models/SubCategory');

// Create items
exports.createItem = async (req, res) => {
    try {
        // Extract data from the request body
        const { name, image, description, taxApplicability, tax, baseAmount, discount, SubCategoryId } = req.body;

        // Validate the required fields
        if (!name || !image || !description || !SubCategoryId) {
            return res.status(400).json({ error: 'Name, image, description, and SubCategoryId are required fields' });
        }

        // Check if the associated subcategory exists
        const subCategory = await SubCategory.findByPk(SubCategoryId);
        if (!subCategory) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }

         // Calculate totalAmount
         const totalAmount = baseAmount - (discount || 0);

        // Create a new item instance
        const item = new Item({
            name,
            image,
            description,
            taxApplicability: taxApplicability || false,
            tax: tax || 0,
            baseAmount,
            discount,
            totalAmount,
            SubCategoryId
        });

        // Save the item to the database
        await item.save();

        res.status(201).json({ message: 'Item created successfully', item });
    } catch (err) {
        // Handle errors
        console.error('Error creating item:', err);
        res.status(500).json({ error: 'An error occurred while creating the item' });
    }
};


// Get all items
exports.getAllItems = async (req, res) => {
    try {
        // Query all items from the database
        const items = await Item.findAll();

        // Send JSON response with items
        res.status(200).json(items);
    } catch (err) {
        // Handle errors
        console.error('Error fetching items:', err);
        res.status(500).json({ error: 'An error occurred while fetching items' });
    }
};


// Get items by category
exports.getItemsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Query subcategories under the specified category
        const subcategories = await SubCategory.findAll({
            where: { CategoryId: categoryId }
        });

        // Extract subcategory IDs
        const subcategoryIds = subcategories.map(subcategory => subcategory.id);

        // Query items associated with the subcategories
        const items = await Item.findAll({
            where: { SubCategoryId: subcategoryIds }
        });

        // Send JSON response with items
        res.status(200).json(items);
    } catch (err) {
        // Handle errors
        console.error('Error fetching items by category:', err);
        res.status(500).json({ error: 'An error occurred while fetching items by category' });
    }
};



// Get items by sub-category
exports.getItemsBySubcategory = async (req, res) => {
    try {
        const { subcategoryId } = req.params;

        // Query items associated with the specified sub-category
        const items = await Item.findAll({
            where: { SubCategoryId: subcategoryId }
        });

        // Send JSON response with items
        res.status(200).json(items);
    } catch (err) {
        // Handle errors
        console.error('Error fetching items by sub-category:', err);
        res.status(500).json({ error: 'An error occurred while fetching items by sub-category' });
    }
};



// Get item by name or ID
exports.getItem = async (req, res) => {
    try {
        const { identifier } = req.params;

         // Define the where condition based on the type of identifier
         const whereCondition = isNaN(identifier) ? { name: identifier } : { id: identifier };

        // Query item by name or ID from the database
        const item = await Item.findOne({
            where: whereCondition
        });

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        // Send JSON response with item
        res.status(200).json(item);
    } catch (err) {
        // Handle errors
        console.error('Error fetching item:', err);
        res.status(500).json({ error: 'An error occurred while fetching item' });
    }
};



// Update item attributes
exports.updateItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { name, image, description, taxApplicability, tax, baseAmount, discount } = req.body;

        // Find the item by ID
        const item = await Item.findByPk(itemId);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        // Update item attributes
        item.name = name || item.name;
        item.image = image || item.image;
        item.description = description || item.description;
        item.taxApplicability = taxApplicability !== undefined ? taxApplicability : item.taxApplicability;
        item.tax = tax !== undefined ? tax : item.tax;
        item.baseAmount = baseAmount !== undefined ? baseAmount : item.baseAmount;
        item.discount = discount !== undefined ? discount : item.discount;

        // Calculate total amount based on base amount and discount
        item.totalAmount = item.baseAmount - item.discount;

        // Save the updated item
        await item.save();

        // Send JSON response with updated item
        res.status(200).json({ message: 'Item updated successfully', item });
    } catch (err) {
        // Handle errors
        console.error('Error updating item:', err);
        res.status(500).json({ error: 'An error occurred while updating item' });
    }
};



// Search for items by name
exports.searchItemsByName = async (req, res) => {
    try {
        const { name } = req.query;

        // Query the database for items that match the provided name
        const items = await Item.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%` // Case-insensitive search for partial match
                }
            }
        });

        // Send JSON response with the list of matching items
        res.status(200).json(items);
    } catch (err) {
        // Handle errors
        console.error('Error searching for items by name:', err);
        res.status(500).json({ error: 'An error occurred while searching for items' });
    }
};