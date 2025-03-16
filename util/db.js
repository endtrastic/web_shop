const Sequelize = require('sequelize')

const sequelize = new Sequelize('web_shop', 'arm', 'qwerty', {
    dialect: 'mysql',
    host: 'localhost'
})


module.exports = sequelize