const asyncErrorHandler = require('../asyncErrorHandler');
const sendResponse = require('../../utils/sendResponse');
const { RepairmentImage, Repairment, sequelize } = require('../../models');
const CustomError = require('../../utils/CustomError');

const reportRepairmentController = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { images, userPayload } = req;
    const repairment = await Repairment.findOne({ where: { id, userId: userPayload.id } });
    if (!repairment) return next(new CustomError('Data not found', 404));

    const imageItems = images.map((imageUrl) => ({ imageUrl, repairmentId: id }));
    const repairmentImages = await RepairmentImage.bulkCreate(imageItems, { transaction: t });
    await Repairment.update({ isReported: true }, { where: { id, userId: userPayload.id }, transaction: t });
    await t.commit();
    sendResponse(res, 'repairment reported', repairmentImages);
  } catch (error) {
    console.log(error);
    await t.rollback();
    next(error);
  }
};

module.exports = reportRepairmentController;
