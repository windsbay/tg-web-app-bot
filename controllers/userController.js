const {User, UserRewards} = require('../models/models')
const eventHandler = require('../_middleware/eventHandler')
const bot = require('../tg-bot/TelBot');

class UserController {

    async createUser(req, res) {
        const { user_id, referer } = req.body;
        const equal = user_id === referer;
        const newUser = await User.create({
            user_id: user_id,
            referer: equal ? null : referer,
            balance: 10000
        });
        const userRewards = await UserRewards.create({
            user_id: user_id
        });
        console.log(`Table of user ${userRewards.user_id} created`);
        if (referer !== null) {
            try {
                // Получаем пользователя
                const user = await UserRewards.findByPk(referer);
                // Обновляем баланс
                const balance = parseInt(user.balance);
                user.balance = balance + 10000;
                await user.save();
            } catch (error) {
                console.error('Ошибка при обновлении баланса:', error);
            }
        }
        eventHandler.emit('newUser', newUser.user_id, referer, newUser.balance);
        res.status(200).json(newUser);
    }

    async claimRewards(req, res) {
        const {user_id} = req.params;
        //получаем значение из таблицы rewards
        const user_r = await UserRewards.findByPk(user_id);

        const user_r_balance = parseInt(user_r.balance);

        //получаем значение баланса пользователя
        const user = await User.findByPk(user_id);
        const balance = parseInt(user.balance);
        user.balance = balance + user_r_balance;
        await user.save();
        eventHandler.emit('claimed', user.user_id, user_r_balance);
        user_r.balance = 0;
        await user_r.save();
        res.status(200).json({message: `Claimed ${user.user_id} claimed`});
    }

    async existsUser(req, res) {
        const { user_id } = req.params;
        const user = await User.findByPk(user_id);
        if (user){
            res.json({message: true});
        }
        else {
            res.json({message: false});
        }
    }

    async getUser(req, res) {
        const { user_id } = req.params;
        try{
            const user = await User.findByPk(user_id);
            if(user) {
                res.json(user);
            } else {
                res.status(404).json({message: "User not found"});
            }
        } catch (error) {
            res.status(500).json({message: 'Internal server error'});
        }
    }

    async getUserRewards(req, res){
        const { user_id } = req.params;
        try {
            const user = await UserRewards.findByPk(user_id);
            res.json(user.balance);
        } catch (e) {}
    }

    async getReferals(req, res) {
        const { user_id } = req.params;
        try {
            const referrals = await User.findAll({
                where: { referer: user_id }
            });
            if (referrals.length > 0) {
                res.json(referrals);
            } else {
                res.status(404).json({ error: 'No referrals found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getAllUsersID(req, res){
        try {
            const users = await User.findAll({
                attributes: ['user_id']
            });

            const userIds = users.map(user => user.user_id);
            res.json(userIds);
        } catch (error) {
            console.error('Ошибка при получении user_id:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    }

    async getAll(req, res){
        const users = await User.findAll({
            attributes: ['user_id']
        });

        const userIds = users.map(user => user.user_id);
        res.json(userIds);
    }

    async deleteUser(req, res) {
        const { user_id } = req.params;
        const result = await User.destroy({
            where: {
                user_id: user_id
            }
        });
        res.json({message: "User deleted"});
    }
}

module.exports = new UserController();