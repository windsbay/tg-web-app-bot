const Router =require('express');
const router = new Router();
const userController = require('../controllers/userController');

router.get('/exists/:user_id', userController.existsUser);
router.get('/:user_id', userController.getUser);
router.delete('/:user_id', userController.deleteUser);
router.get('/:user_id/referrals', userController.getReferals);
router.post('/', userController.createUser);
router.get('/get/all_ids', userController.getAllUsersID);
router.get('/rewards/:user_id', userController.getUserRewards);
router.get('/rewards/claim/:user_id', userController.claimRewards);


module.exports = router;