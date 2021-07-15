const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const catalogController = require('../controllers/catalog-controller')
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/verification', userController.verification);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);
router.get('/user', userController.checkUser)
router.get('/test', authMiddleware ,catalogController.test);

// router.get('/anypath', authMiddleware, userController.checkUser)

module.exports = router
