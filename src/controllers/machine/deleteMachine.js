const asyncErrorHandler = require('../asyncErrorHandler');
const { Machine } = require('../../models');
const sendResponse = require('../../utils/sendResponse');

const deleteMachineController = asyncErrorHandler(async (req, res, next) => {
  console.log('delete');
  const machine = await Machine.findByPk(req.params.id);

  if (!machine) return next(new CustomError('Machine not found', 404));

  await machine.destroy();

  sendResponse(res, 'Machine deleted');
});

module.exports = deleteMachineController;
