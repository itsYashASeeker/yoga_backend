const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');

const app = express();
app.use(bodyParser.json());

sequelize.sync({ force: true }).then(() => {
    console.log('Database synced');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});