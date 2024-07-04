const { Repairment, ReportedImage, sequelize, Sequelize } = require('../../models');
const { repairmentStatusMapper } = require('../../../config/constant');
const CustomError = require('../../utils/CustomError');
const sendResponse = require('../../utils/sendResponse');

const deleteRepairmentController = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { Op } = Sequelize;
    const repairment = await Repairment.findByPk(req.params.id, {
      include: [
        {
          model: ReportedImage,
          as: 'reportedImages',
          attributes: ['id'],
        },
      ],
    });
    if (!repairment) return next(new CustomError('Data not found', 404));
    if (repairment.status !== repairmentStatusMapper[0])
      return next(new CustomError("Machine is in repairment stage, data can't be deleted"));

    const reportedImages = repairment.reportedImages.map((image) => image.id);
    ReportedImage.destroy({ where: { id: { [Op.in]: reportedImages } }, transaction });
    await repairment.destroy({ transaction });
    await transaction.commit();
    sendResponse(res, 'success', repairment);
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

module.exports = deleteRepairmentController;
