const express =  require('express');
const TelegramBot = require('node-telegram-bot-api');
const userRouter = require('./routes/user.routes');

const PORT = process.env.PORT || 5000;
const token = "7400849110:AAH4L-pCrJIHGhUBSHa2k4h6m0zzmQQ8rY8";
const app = express()


app.use(express.json());

app.use('/api', userRouter)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const bot = new TelegramBot(token, {polling: true});
const webAppUrl = 'https://fancy-strudel-fdacc6.netlify.app/';

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const  text = msg.text;
    if(text === "/start")
    {

        await bot.sendMessage(chatId, 'Received your message', {
            reply_markup:{
                inline_keyboard: [
                    [{text: 'Open App', web_app:{url: webAppUrl}}]
                ]
            }
        });
    }
});