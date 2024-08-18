const TelegramBot = require('node-telegram-bot-api');

const webAppUrl = 'https://fancy-strudel-fdacc6.netlify.app/';


class TelBot {

    constructor(token) {
        this.bot = new TelegramBot(token, {polling: true});
        this.initializeHandlers();

    }

    initializeHandlers() {
        this.bot.on('message', async (msg) => {
            const chatId = msg.chat.id;
            const img = "AgACAgIAAxkBAAP4Zrv4Ay8jnUpO4hkIQw1tUUs-XJ0AAvPeMRsa4uBJwBXJkXabmCIBAAMCAAN4AAM1BA";
            const message = "Welcome to Modman App! 🎉🎉🎉";
            const options = {
                caption: message,
                reply_markup: {
                    inline_keyboard: [
                        [{text: 'Launch App', web_app:{url: webAppUrl}}],
                        [{text: 'Join community', url: 'https://t.me/modmanblog'}]
                    ]
                }
            }
            const text = msg.text;
            if(text === "/start"){
                await this.bot.sendPhoto(chatId, img, options);
            }
            if(text === "/id"){
                await this.bot.sendMessage(chatId, chatId);
            }
        });

    }

    async sendMessage(user_id, text) {
        try {
            await this.bot.sendMessage(user_id, text, {
                reply_markup: {
                    inline_keyboard: [
                        [{text: 'Open App', web_app: {url: webAppUrl}}],
                        [{text: 'Join our community', url: 'https://t.me/modmanblog'}]
                    ]
                }
            });
        } catch (err) {
        }
    }

    async getUsername(user_id){
        try {
            const chat = await this.bot.getChat(user_id);
            return chat.username;
        } catch (error) {
            return null;
        }

    }

    async premiumCheck(user_id){
        try {
            const data = await this.bot.getChatMember('@modmanblog', user_id);
            return data.status === 'member' && data.user.is_premium;
        } catch (error) {
            console.error('Ошибка при проверке статуса:', error);
            return false;
        }
    }


    stop() {
        this.bot.stopPolling();
        console.log('Бот остановлен');
    }
}

module.exports = new TelBot(process.env.BOT_TOKEN);