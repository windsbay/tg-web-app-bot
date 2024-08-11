const db = require('../_helpers/db')

class UserController{

    async createUser(req, res){
        const {user_id, referer} = req.body;
        const newUser = await db.query(`INSERT INTO users (user_id, referer) values ($1, $2) RETURNING *`, [user_id, referer]);
        res.json(newUser.rows[0]);
    }

    async getUsers(req, res){
        const query = await db.query(`SELECT * FROM users`);
        res.json(query.rows);
    }

    async getUser(req, res){
        const id = req.params.user_id;
        const user = await db.query(`SELECT * FROM users WHERE user_id = $1`, [id]);
        res.json(user.rows);
    }

    async getCountUsers(req, res){
        const id = req.params.user_id;
        const count = await db.query(`SELECT COUNT(*) AS user_count FROM users WHERE user_id = $1`, [id]);
        res.json(count.rows[0].user_count);
    }

    async getTotalUsers(req, res){
        const totalUS = await db.query(`SELECT COUNT(*) AS total_users FROM users`);
        res.json(totalUS.rows[0].total_users);
    }

    async updateUser(req, res){
        const {user_id, referer, score, wallet} = req.body;
        const user = await db.query(`UPDATE users SET referer = $1, score = $2, wallet = $3 WHERE user_id = $4 RETURNING *`, [referer, score, wallet, user_id]);
        res.json(user.rows[0]);
    }

    async deleteUser(req, res){
        const id = req.params.user_id;
        const user = await db.query(`DELETE FROM users WHERE user_id = $1`, [id]);
        res.json(user.rows[0]);
    }
}

module.exports = new UserController();