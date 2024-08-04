const TelegramBot = require('node-telegram-bot-api');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'mysql.b559fbfa7208.hosting.myjino.ru',
    port: 3306,
    user: 'j03809714_modman',
    password: "aLeksey2011!",
    database: 'j03809714_modmancomm'
});

conn.connect(err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to DATABASE');
    }
});

const TOKEN = '7400849110:AAH4L-pCrJIHGhUBSHa2k4h6m0zzmQQ8rY8';
const webAppUrl = 'https://fancy-strudel-fdacc6.netlify.app/';

const bot = new TelegramBot(TOKEN, {polling: true});


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const  text = msg.text;

    if(text === "/start")
    {
        await bot.sendMessage(chatId, 'Received your message');
    }


});

