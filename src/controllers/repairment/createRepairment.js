const asyncErrorHandler = require('../asyncErrorHandler');
const sendResponse = require('../../utils/sendResponse');
const { Repairment, Machine, Sequelize } = require('../../models');
const repairmentStatusMapper = require('../../../config/constant');
const CustomError = require('../../utils/CustomError');

const createRepairmentController = asyncErrorHandler(async (req, res, next) => {
  const { machineId, description, repairmentDate } = req.body;

  const machine = await Machine.findByPk(machineId);
  if (!machine) return next(new CustomError('Machine not found', 404));

  const repairments = await machine.getRepairments({
    where: {
      [Sequelize.Op.or]: [
        { status: repairmentStatusMapper[0] },
        { status: repairmentStatusMapper[1] },
        { status: repairmentStatusMapper[2] },
      ],
    },
  });

  if (repairments && repairments.length > 0) return next(new CustomError('Machine already in repairment stage', 409));

  const repairment = await Repairment.create({ machineId, description, repairmentDate });
  sendResponse(res, 'repairment requested', repairment, 201);
});

module.exports = createRepairmentController;
