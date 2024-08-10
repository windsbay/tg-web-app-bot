require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');
const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api routes
app.use('/users', require('/users/user.controller.js'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));

//// Telegramm /////
const bot = new TelegramBot(config.bot.token, {polling: true});
const webAppUrl = 'https://fancy-strudel-fdacc6.netlify.app/';

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const  text = msg.text;
    if(text === "/start")
    {
        await bot.sendMessage(chatId, 'Received your message');
    }
});

