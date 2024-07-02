const asyncErrorHandler = require('../asyncErrorHandler');
const { Repairment, User, RepairmentImage, Machine, Sequelize, Category, ReportedImage } = require('../../models');
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
      {
        model: User,
        as: 'technician',
        attributes: [],
      },
      {
        model: User,
        as: 'leader',
        attributes: [],
      },
      {
        model: ReportedImage,
        as: 'reportedImages',
        attributes: ['id', 'imageUrl'],
      },
    ],
    attributes: [
      'id',
      'description',
      'userId',
      'status',
      ['repairment_date', 'repairmentDate'],
      [Sequelize.col('technician.first_name'), 'firstName'],
      [Sequelize.col('technician.last_name'), 'lastName'],
      [Sequelize.col('leader.first_name'), 'leaderFirstName'],
      [Sequelize.col('leader.last_name'), 'leaderLastName'],
    ],
  });
  if (!repairment) return next(new CustomError('repairment data not found', 404));
  sendResponse(res, 'Repairment detail', repairment);
});

module.exports = getRepairmentDetailController;
