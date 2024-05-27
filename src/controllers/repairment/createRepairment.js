const asyncErrorHandler = require('../asyncErrorHandler');
const sendResponse = require('../../utils/sendResponse');
const { Repairment, Machine, Sequelize, sequelize } = require('../../models');
const CustomError = require('../../utils/CustomError');
const { repairmentStatusMapper } = require('../../../config/constant');

const createRepairmentController = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { machineId, description, repairmentDate } = req.body;

    const machine = await Machine.findByPk(machineId);
    if (!machine) return next(new CustomError('Machine not found', 404));

    const repairments = await machine.getRepairments({
      where: {
        [Sequelize.Op.or]: [{ status: repairmentStatusMapper[0] }, { status: repairmentStatusMapper[1] }],
      },
    });

    if (repairments && repairments.length > 0) return next(new CustomError('Machine already in repairment stage', 409));

    const repairment = await Repairment.create(
      {
        machineId,
        description,
        repairmentDate,
        status: repairmentStatusMapper[0],
      },
      { transaction }
    );

    await Machine.update({ status: 'perbaikan' }, { where: { id: machineId }, transaction });
    await transaction.commit();
    sendResponse(res, 'repairment requested', repairment, 201);
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    next(error);
  }
};

module.exports = createRepairmentController;
