const asyncErrorHandler = require('../asyncErrorHandler');
const { Machine, Sequelize, Category } = require('../../models');
const sendResponse = require('../../utils/sendResponse');
const CustomError = require('../../utils/CustomError');

const getMachineByIdController = asyncErrorHandler(async (req, res, next) => {
  const machine = await Machine.findByPk(req.params.id, {
    attributes: [
      'machineName',
      'status',
      'buyDate',
      'description',
      [Sequelize.col('category.category_name'), 'categoryName'],
    ],
    include: [{ model: Category, as: 'category', attributes: [] }],
  });

  if (!machine) return next(new CustomError('Machine not found', 404));

  sendResponse(res, 'Machine detail', machine);
});

module.exports = getMachineByIdController;
