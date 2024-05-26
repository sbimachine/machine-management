const asyncErrorHandler = require('../asyncErrorHandler');
const { User, Repairment } = require('../../models');
const CustomError = require('../../utils/CustomError');
const sendResponse = require('../../utils/sendResponse');
const { repairmentStatusMapper } = require('../../../config/constant');

const assignRepairmentController = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  const repairment = await Repairment.findByPk(id);
  if (!repairment) return next(new CustomError('Repairment data not found', 404));

  const user = await User.findByPk(userId);
  if (!user) return next(new CustomError('User not found', 404));

  repairment.set({ userId, status: repairmentStatusMapper[1] });
  await repairment.save();

  sendResponse(res, 'repairment data changed', repairment);
});

module.exports = assignRepairmentController;
