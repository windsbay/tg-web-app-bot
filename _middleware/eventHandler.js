const EventEmitter = require("events");
const bot = require('../tg-bot/TelBot')
const {User, UserRewards} = require('../models/models')

class EventHandler extends EventEmitter {}
const eventHandler = new EventHandler();

eventHandler.on('event', (data) => {
    console.log(data);
});

eventHandler.on('claimed', (user_id, amount) => {
    console.log(`claimed ${user_id} claimed, ${amount}`);
    (async () => {
        const user = await User.findByPk(user_id);
        const referer = user.referer;
        if(referer !== null){
            try{
                const _referer = await UserRewards.findByPk(referer)
                const balance = parseInt(_referer.balance);
                console.log(`balance = ${balance}`);
                _referer.balance = balance + (amount / 4);
                console.log(`new balance = ${_referer.balance}`);
                await _referer.save();
            } catch(error){
                console.log(error);
            }
            if(referer.referer !== null){
                try {
                    const user2 = referer.referer;
                    const referer2 = await UserRewards.findByPk(user2);
                    const balanceReferer = parseInt(referer2.balance);
                    referer2.balance = balanceReferer + (amount / 20);
                    await referer2.save();
                } catch(error) {
                    console.log(error);
                }

            }
        }
    })();

})

async function updateBalance(user, balance, amount, part) {
    user.balance = balance + (amount / part);
    return user.balance;
}

eventHandler.on('start', (chatId, referer) => {
    bot.sendMessage(chatId, `Ты здесь благодаря, @${referer}`);
});

eventHandler.on('newUser',   (user_id, referer, balance) => {
        (async () => {
            const chat = await bot.getUsername(user_id);
            if (chat !== null) {
                const username = await bot.getUsername(referer);
                try {
                    await bot.sendMessage(referer, `@${chat} Зарегистрировался по вашей реферальной ссылке`);
                    if(username !== null){
                        await bot.sendMessage(
                            user_id,
                            `Ты здесь благодаря @${username}\n Твой баланс: ${balance}`
                        );
                    }
                    else{
                        await bot.sendMessage(
                            user_id,
                            `Ты успешно зарегистрировался\n Твой баланс: ${balance}`
                        );
                    }

                } catch (e) {
                }
            }else {
                try {
                    await bot.sendMessage(referer, "По вашей ссылке зарегистрировался новый реферал");
                } catch (e) {}
            }
        })();
    console.log(`New user created with ID: ${user_id}, Referer: ${referer}`);
});

eventHandler.on('newTask', (task_id) => {
    console.log(`New task created with ID: ${task_id}`);
});

module.exports = eventHandler;