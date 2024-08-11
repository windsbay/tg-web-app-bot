const Router = require('express');
const router = new Router()
const userController = require('../controller/user.controller')

router.post('/user', userController.createUser)
router.get('/user', userController.getUsers)
router.get('/user/:user_id', userController.getUser)
router.get('/user/count/:user_id', userController.getCountUsers)
router.get('/users', userController.getTotalUsers)
router.put('/user', userController.updateUser)
router.delete('/user/:user_id', userController.deleteUser)


module.exports = router