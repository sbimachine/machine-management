const changeUserImageController = require('../controllers/user/changeImage');
const changePasswordController = require('../controllers/user/changePassword');
const editUserController = require('../controllers/user/editUser');
const getAllUserController = require('../controllers/user/getAllUser');
const getDetailUserController = require('../controllers/user/getDetail');
const { verifyToken, allowRole } = require('../middlewares/auth/');
const { cloudinaryUpload, upload } = require('../middlewares/upload');
const routes = require('express').Router();

routes.patch('/change-password', verifyToken, changePasswordController);
routes.patch('/change-image', verifyToken, upload.single, cloudinaryUpload('profile', false), changeUserImageController);
routes.get('/', verifyToken, getDetailUserController);
routes.patch('/', verifyToken, editUserController);
routes.get('/browse', verifyToken, allowRole('supervisior', 'leader'), getAllUserController);

module.exports = routes;
