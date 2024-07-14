# Menu Management Backend

This is a Node.js backend server for menu management, allowing you to manage categories, subcategories, and items. 
The application uses Sequelize for database operations and is structured with a model-controller approach.


## Installation
1. Clone the repository:  git clone https://github.com/manvigupta226/MenuManagement.git
2. Navigate to the project directory: cd MenuManagement
3. Install the dependencies: npm install
4. Set up your database configuration in 'config/database.js'
5. Create a '.env' file in the root directory and configure your environment variables.
6. Sync the Sequelize models with the database.


## Usage
1. Start the server: node index.js
2. The server will be running on 'http://localhost:3000'
3. Use Postman or any other API client to interact with the API endpoints.


## API Endpoints

### Categories

1. Create category: POST /categories

   **Request Body-**
  ```
    {
  "name": "Beverages",
  "image": "http://example.com/image.jpg",
  "description": "Various kinds of beverages",
  "taxApplicability": true,
  "tax": 10.5,
  "taxType": "percentage"
}
```


3. Get all categories:
   ```
   GET /categories
   ```

4. Get category by ID or Name:
   ```
   GET /categories/:id_or_name
   ```

5. Update a category:
  ``` 
  PUT /categories/:id
```

   **Request Body-**
   ```
   {
  "name": "New Beverages",
  "image": "http://example.com/new-image.jpg",
  "description": "Updated description",
  "taxApplicability": false,
  "tax": 8.5,
  "taxType": "fixed"
}
```


### Subcategories

1. Create a Subcategory:
   ```
   POST /subcategories
   ```

    **Request Body-**
```
   {
  "name": "Soft Drinks",
  "image": "http://example.com/image.jpg",
  "description": "Carbonated beverages",
  "taxApplicability": true,
  "tax": 5,
  "taxType": "percentage",
  "categoryId": 1
}
```
  
2. Get all Subcategories:
```
GET /subcategories
```

3. Get Subcategories by Category:
  ```
  GET /categories/:categoryId/subcategories
  ```

4. Get Subcategory by ID or Name:
```
GET /subcategories/:id_or_name
```

5. Update a Subcategory:
```
PUT /subcategories/:id
```

   **Request Body-**
   ```
   {
  "name": "New Soft Drinks",
  "image": "http://example.com/new-image.jpg",
  "description": "Updated description",
  "taxApplicability": false,
  "tax": 3,
  "taxType": "fixed"
}
```


### Items

1. Create an Item:
```
POST /items
```

   **Request Body-**
   ```
   {
  "name": "Coca Cola",
  "image": "http://example.com/image.jpg",
  "description": "A refreshing drink",
  "taxApplicability": true,
  "tax": 2,
  "baseAmount": 10,
  "discount": 1,
  "subcategoryId": 1
}
```

2. Get all Items:
```
  GET /items
```

3. Get items by Subcategory:
```
GET /subcategories/:subcategoryId/items
```

4. Get item by ID or Name:
```  
 GET /items/:id_or_name
```

5. Update an item:
  ```
PUT /items/:id
```

   **Request Body-**
   ```
   {
  "name": "New Coca Cola",
  "image": "http://example.com/new-image.jpg",
  "description": "Updated description",
  "taxApplicability": false,
  "tax": 1.5,
  "baseAmount": 9,
  "discount": 0.5
}
```


## Database Schema
The project uses Sequelize ORM to define models and manage database interactions. The main models are:
1. Category
2. SubCategory
3. Item

   ![Screenshot from 2024-05-17 12-31-58](https://github.com/manvigupta226/MenuManagement/assets/107646725/92e20e3f-ee74-47ab-81b8-b72cb17f0345)


## Postman Collection- https://www.postman.com/solar-capsule-271232/workspace/menumanagement/collection/34972431-bd677e05-8daf-4268-a2ce-39cb6e19ec95?action=share&creator=34972431



   







   
