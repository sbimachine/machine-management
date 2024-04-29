const asyncErrorHandler = require('../asyncErrorHandler');
const { Repairment } = require('../../models');
const CustomError = require('../../utils/CustomError');
const sendResponse = require('../../utils/sendResponse');

const updateStatusRepairmentController = asyncErrorHandler(async (req, res, next) => {
  const { status } = req.body;
  const repairment = await Repairment.findByPk(req.params.id);
  if (!repairment) return next(new CustomError('Data not found', 404));

  repairment.status = status;

  await repairment.save();
  sendResponse(res, 'success', repairment);
});

module.exports = updateStatusRepairmentController;
