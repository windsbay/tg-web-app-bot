const { Task, UserTask, User, TaskType, UserRewards} = require('../models/models')
const eventHandler = require('../_middleware/eventHandler')
const ApiError = require('../error/ApiError')

class TasksController {

    async createTask(req, res) {
        const { taskTypeId, description, socialNetworkId, link, reward, deadline, correct_answer } = req.body;
        try {
            const newTask = await Task.create({
                taskTypeId,
                description,
                socialNetworkId,
                link,
                reward,
                deadline: deadline || null,
                correct_answer: correct_answer || null
            });
            res.json(newTask);
            eventHandler.emit('newTask', newTask.id);
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при создании задания' });
        }
    }



    async getAllTasks(req, res) {
        const tasks = await Task.findAll();
        res.json(tasks);
    }

    async checkCompleteTask(req, res) {
        const { userId, answer } = req.body;
        const { taskId } = req.params;
        const task = await Task.findByPk(taskId);
        const user = await User.findByPk(userId);
        const rewads = await UserRewards.findByPk(userId)

        if (task && user) {
            await UserTask.create({
                userId,
                taskId,
                status: 'completed',
                answer
            });

            const rew_balance = parseInt(rewads.balance);
            rewads.balance = rew_balance + task.reward;
            await user.save();

            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
}

module.exports = new TasksController();