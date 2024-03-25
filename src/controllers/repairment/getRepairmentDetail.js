const asyncErrorHandler = require('../asyncErrorHandler');
const { Repairment, RepairmentImage, Machine, Sequelize, Category } = require('../../models');
const CustomError = require('../../utils/CustomError');
const sendResponse = require('../../utils/sendResponse');

const getRepairmentDetailController = asyncErrorHandler(async (req, res, next) => {
  const repairment = await Repairment.findByPk(req.params.id, {
    include: [
      {
        model: Machine,
        as: 'machine',
        attributes: [['id', 'machineId'], 'machineName', 'buyDate'],
        include: { model: Category, as: 'category', attributes: ['categoryName'] },
      },
      {
        model: RepairmentImage,
        as: 'images',
        attributes: ['id', 'imageUrl'],
      },
    ],
    attributes: ['id', 'description', 'userId', 'status'],
  });
  if (!repairment) return next(new CustomError('repairment data not found', 404));
  sendResponse(res, 'Repairment detail', repairment);
});

module.exports = getRepairmentDetailController;
