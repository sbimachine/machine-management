const { repairmentStatusMapper } = require('../../../config/constant');
const { Repairment, Machine, sequelize } = require('../../models');
const CustomError = require('../../utils/CustomError');
const sendResponse = require('../../utils/sendResponse');

const updateStatusRepairmentController = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const { status } = req.body;
    const repairment = await Repairment.findByPk(req.params.id);
    if (!repairment) return next(new CustomError('Data not found', 404));

    repairment.status = status;

    const machineStatus = repairmentStatusMapper[4] === status ? 'ready' : 'rusak';
    await repairment.save();
    await transaction.commit();

    await Machine.update({ status: machineStatus }, { where: { id: repairment.machineId }, transaction });
    sendResponse(res, 'success', repairment);
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    next(error);
  }
};

module.exports = updateStatusRepairmentController;
