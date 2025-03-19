const Sequelize = require('sequelize')
const sequelize = require('../util/db')


const Product = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT,
    },
    email: {
        type: Sequelize.TEXT,
    }
})

module.exports = Product;