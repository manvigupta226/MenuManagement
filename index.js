const express = require('express'); 
const app = express(); 
const PORT = 3000; 

const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const itemRoutes = require('./routes/itemRoutes');

const sequelize = require('./config/database');
require('./associations'); // Require associations to set up associations



app.get('/', function (req, res) {
    res.send('Hello World!');
  });


  // Middleware
  app.use(express.json());

  // Routes
  app.use('/categories', categoryRoutes);
  app.use('/subcategories', subcategoryRoutes);
  app.use('/items', itemRoutes);


// Sync Sequelize models
sequelize.sync({ force: false }) // Use force: true to drop and recreate tables
    .then(() => {
        console.log("Sequelize models synced successfully");
        // Start Express server after syncing models
        app.listen(PORT, () => {
            console.log("Server is running and listening on port " + PORT);
        });
    })
    .catch(error => {
        console.error("Error occurred while syncing Sequelize models:", error);
    });

    module.exports = sequelize;


