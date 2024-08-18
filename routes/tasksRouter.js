const express = require('express');
const router = express.Router();
const {TaskType, SocialNetwork} = require('../models/models');
const tasksController = require('../controllers/tasksController');

router.get('/', tasksController.getAllTasks);
router.post('/complete/:taskId', tasksController.checkCompleteTask);
router.post('/', tasksController.createTask);


async function Initialize() {
    const subscriptionTaskType = await TaskType.create({ name: 'Socials' });
    const questionAnswerTaskType = await TaskType.create({ name: 'Answer the question' });
    const referralTaskType = await TaskType.create({ name: 'Frens tasks' });
    const promoTaskType = await TaskType.create({ name: 'Promo tasks' });
    const vk = await SocialNetwork.create({name: 'Vk'});
    const telegram = await SocialNetwork.create({name: 'Telegram'});
    const youtube = await SocialNetwork.create({name: 'YouTube'});
    const instagram = await SocialNetwork.create({name: 'Instagram'});
    const x = await SocialNetwork.create({name: 'X'});
    const facebook   = await SocialNetwork.create({name: 'Facebook'});
}

//Initialize()


module.exports = router;