const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '12345678', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false // Disable logging SQL queries (optional)
});

module.exports = sequelize;
