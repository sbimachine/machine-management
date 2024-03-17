const loginController = require('../controllers/auth/login');
const registerController = require('../controllers/auth/register');
const { verifyToken, allowRole } = require('../middlewares/auth/');

const routes = require('express').Router();

routes.post('/register', verifyToken, allowRole.supervisior, registerController);
routes.post('/login', loginController);

module.exports = routes;
