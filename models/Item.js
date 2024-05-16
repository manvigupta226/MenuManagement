const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Item = sequelize.define('Item', {
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
        allowNull: false
    },
    tax: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    baseAmount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    discount: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        get() {
            const baseAmount = this.getDataValue('baseAmount') || 0;
            const discount = this.getDataValue('discount') || 0;
            return baseAmount - discount;
        }
    }
});

module.exports = Item;
