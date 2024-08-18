const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const tasksRouter = require('./tasksRouter');

router.use('/user', userRouter)
router.use('/tasks', tasksRouter)

module.exports = router;