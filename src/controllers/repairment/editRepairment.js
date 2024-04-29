const asyncErrorHandler = require('../asyncErrorHandler');
const { Repairment } = require('../../models');
const { repairmentStatusMapper } = require('../../../config/constant');
const CustomError = require('../../utils/CustomError');
const sendResponse = require('../../utils/sendResponse');

const editRepairmentController = asyncErrorHandler(async (req, res, next) => {
  const { machineId, description, repairmentDate } = req.body;
  const repairment = await Repairment.findByPk(req.params.id);
  if (!repairment) return next(new CustomError('Data not found', 404));

  if (repairment.status !== repairmentStatusMapper[0])
    return next(new CustomError("Machine is in repairment stage, data can't be edited"));
  if (machineId) repairment.machineId = machineId;
  if (description) repairment.description = description;
  if (repairmentDate) repairment.repairmentDate = repairmentDate;

  await repairment.save();
  sendResponse(res, 'success', repairment);
});

module.exports = editRepairmentController;
