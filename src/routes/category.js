const getCategoriesController = require('../controllers/category/getCategories');
const { verifyToken } = require('../middlewares/auth/');

const routes = require('express').Router();

routes.get('/all', verifyToken, getCategoriesController);

module.exports = routes;
