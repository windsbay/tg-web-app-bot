require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./_middleware/ErrorHandler');
const path = require('path');

const bot = require('./tg-bot/TelBot');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

app.use(errorHandler);




const start = async ()=> {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));
    } catch (e) {
        console.log(e);
    }
}


start()
