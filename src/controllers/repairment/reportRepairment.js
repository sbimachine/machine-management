const asyncErrorHandler = require('../asyncErrorHandler');
const sendResponse = require('../../utils/sendResponse');
const { RepairmentImage, Repairment } = require('../../models');
const CustomError = require('../../utils/CustomError');

const reportRepairmentController = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { images, userPayload } = req;
  const repairment = await Repairment.findOne({ where: { id, userId: userPayload.id } });
  if (!repairment) return next(new CustomError('Data not found', 404));

  const imageItems = images.map((imageUrl) => ({ imageUrl, repairmentId: id }));
  //   const repairmentImages = await RepairmentImage.findAll();
  //   await repairment.createImages(imageItems);
  const repairmentImages = await RepairmentImage.bulkCreate(imageItems);

  sendResponse(res, 'repairment reported', repairmentImages);
});

module.exports = reportRepairmentController;
