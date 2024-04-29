const asyncErrorHandler = require('../asyncErrorHandler');
const { Repairment } = require('../../models');
const { repairmentStatusMapper } = require('../../../config/constant');
const CustomError = require('../../utils/CustomError');
const sendResponse = require('../../utils/sendResponse');

const deleteRepairmentController = asyncErrorHandler(async (req, res, next) => {
  const repairment = await Repairment.findByPk(req.params.id);
  if (!repairment) return next(new CustomError('Data not found', 404));
  if (repairment.status !== repairmentStatusMapper[0])
    return next(new CustomError("Machine is in repairment stage, data can't be deleteed"));

  await repairment.destroy();
  sendResponse(res, 'success', repairment);
});

module.exports = deleteRepairmentController;
