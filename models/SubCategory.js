const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category'); // Import Category model

const SubCategory = sequelize.define('SubCategory', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taxApplicability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    tax: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
        validate: {
            min: {
                args: [0],
                msg: 'Tax must be a non-negative number'
            }
        }
    },
    taxType: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
});



module.exports = SubCategory;
