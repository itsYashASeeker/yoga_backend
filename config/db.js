const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    storage: './yoga.db',
    username: 'root',
    password: 'root@YASH13'
});

module.exports = sequelize;
