const asyncErrorHandler = require('../asyncErrorHandler');
const { Repairment, Machine, Sequelize, User, Category } = require('../../models');
const getPagination = require('../../utils/getPagination');
const sendResponse = require('../../utils/sendResponse');
const getUserRepairmentJob = asyncErrorHandler(async (req, res, next) => {
  const { page = 1, limit = 10, userId, firstName, lastName, categoryId } = req.query;

  const conditions = {
    ...(userId ? { userId } : {}),
    ...(firstName ? { '$technician.first_name$': { [Sequelize.Op.iLike]: `%${firstName.toLowerCase()}%` } } : {}),
    ...(lastName ? { '$technician.last_name$': { [Sequelize.Op.iLike]: `%${lastName.toLowerCase()}%` } } : {}),
    ...(categoryId ? { '$machine.category_id$': categoryId } : {}),
  };

  const { count, rows: repiarments } = await Repairment.findAndCountAll({
    where: conditions,
    attributes: [
      'id',
      'createdAt',
      'status',
      'userId',
      [Sequelize.col('machine.machine_name'), 'machineName'],
      [Sequelize.col('technician.first_name'), 'firstName'],
      [Sequelize.col('technician.last_name'), 'lastName'],
      [Sequelize.col('machine.category_name'), 'categoryName'],
      [Sequelize.col('machine.category_id'), 'categoryId'],
    ],

    include: [
      {
        model: Machine,
        as: 'machine',
        attributes: [],
      },
      { model: User, as: 'technician', attributes: [] },
    ],
  });

  const pagination = getPagination(count, page, limit);
  const data = { repiarments: !repiarments || repiarments.length === 0 ? [] : repiarments, pagination };
  sendResponse(res, 'Job list', data);
});

module.exports = getUserRepairmentJob;
