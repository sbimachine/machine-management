const changePasswordController = require('../controllers/user/changePassword');
const editUserController = require('../controllers/user/editUser');
const getDetailUserController = require('../controllers/user/getDetail');
const { verifyToken } = require('../middlewares/auth/');

const routes = require('express').Router();

routes.patch('/change-password', verifyToken, changePasswordController);
routes.get('/', verifyToken, getDetailUserController);
routes.patch('/', verifyToken, editUserController);

module.exports = routes;
