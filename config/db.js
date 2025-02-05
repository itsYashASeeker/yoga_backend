const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: 'yoga',
    dialect: 'mysql',
    username: 'root',
    password: 'root@YASH13'
});

module.exports = sequelize;
