const asyncErrorHandler = require('../asyncErrorHandler');
const { Category } = require('../../models');
const sendResponse = require('../../utils/sendResponse');
const getCategoriesController = asyncErrorHandler(async (req, res, next) => {
  const categories = await Category.findAll({ attributes: ['id', 'categoryName'] });

  sendResponse(res, 'Category list', categories);
});

module.exports = getCategoriesController;
