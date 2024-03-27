const loginController = require('../controllers/auth/login');
const refreshTokenController = require('../controllers/auth/refreshToken');
const registerController = require('../controllers/auth/register');
const { verifyToken, allowRole } = require('../middlewares/auth/');

const routes = require('express').Router();

routes.post('/register', verifyToken, allowRole('supervisior'), registerController);
routes.post('/login', loginController);
routes.get('/refresh-token', refreshTokenController);

module.exports = routes;
