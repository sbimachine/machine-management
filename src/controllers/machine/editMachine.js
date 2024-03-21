const asyncErrorHandler = require('../asyncErrorHandler');
const { Machine } = require('../../models');
const CustomError = require('../../utils/CustomError');
const sendResponse = require('../../utils/sendResponse');
const editMachineController = asyncErrorHandler(async (req, res, next) => {
  const image = req.image;

  const machine = await Machine.findByPk(req.params.id);

  if (!machine) return next(new CustomError('Machine not found', 404));

  machine.set({ ...req.body, ...(image ? { imageUrl: image } : {}) });
  await machine.save();

  sendResponse(res, 'Machine changed', machine);
});

module.exports = editMachineController;
