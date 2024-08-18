require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const taskRoutes = require('./routes/tasksRouter');
const userRoutes = require('./routes/userRouter');

const app = express();

app.use(bodyParser.json());

app.use('/tasks', taskRoutes);
app.use('/user', userRoutes);

db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});