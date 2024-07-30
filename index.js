const TelegramBot = require('node-telegram-bot-api');

const token = '7400849110:AAH4L-pCrJIHGhUBSHa2k4h6m0zzmQQ8rY8';

const bot = new TelegramBot(token, {polling: true});


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const  text = msg.text;

    if(text === "/start")
    {
        await bot.sendMessage(chatId, 'Received your message');
    }


});

