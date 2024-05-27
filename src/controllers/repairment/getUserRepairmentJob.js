const asyncErrorHandler = require('../asyncErrorHandler');
const { Repairment, Machine, Sequelize, User } = require('../../models');
const getPagination = require('../../utils/getPagination');
const sendResponse = require('../../utils/sendResponse');
const { repairmentStatusMapper } = require('../../../config/constant');
const getUserRepairmentJob = asyncErrorHandler(async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    userId,
    firstName,
    lastName,
    categoryId,
    machineName,
    status,
    sort,
    repairmentDate,
    isReported,
    isProceed,
    isNotProceed,
  } = req.query;

  let sortBy = [['created_at', 'DESC']];
  if (sort === 'repairmentDate') sortBy = [['repairment_date', 'DESC']];
  if (sort === 'machineName') sortBy = [['machineName', 'ASC']];
  const offset = (parseInt(page) - 1) * parseInt(limit || 10);

  const { Op } = Sequelize;
  const conditions = {
    ...(userId ? { userId } : {}),
    ...(firstName ? { '$technician.first_name$': { [Sequelize.Op.iLike]: `%${firstName.toLowerCase()}%` } } : {}),
    ...(lastName ? { '$technician.last_name$': { [Sequelize.Op.iLike]: `%${lastName.toLowerCase()}%` } } : {}),
    ...(categoryId ? { '$machine.category_id$': categoryId } : {}),
    ...(machineName ? { '$machine.machine_name$': { [Sequelize.Op.iLike]: `%${machineName.toLowerCase()}%` } } : {}),
    ...(isProceed ? { status: { [Sequelize.Op.notIn]: [repairmentStatusMapper[0], repairmentStatusMapper[1]] } } : {}),
    ...(isNotProceed ? { status: { [Sequelize.Op.in]: [repairmentStatusMapper[0], repairmentStatusMapper[1]] } } : {}),
    ...(isReported ? { is_reported: isReported } : {}),
    ...(repairmentDate
      ? {
          repairment_date: {
            [Op.gte]: new Date(repairmentDate),
            [Op.lt]: new Date(new Date(repairmentDate).setDate(new Date(repairmentDate).getDate() + 1)),
          },
        }
      : {}),
    ...(status ? { status } : {}),
  };

  const { count, rows: repairments } = await Repairment.findAndCountAll({
    where: conditions,
    ...(!sortBy ? {} : { order: sortBy }),
    offset,
    limit: parseInt(limit || 10),
    attributes: [
      'id',
      'createdAt',
      'status',
      'userId',
      'status',
      'isReported',
      ['repairment_date', 'repairmentDate'],
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
  const data = { repairments: !repairments || repairments.length === 0 ? [] : repairments, pagination };
  sendResponse(res, 'Job list', data);
});

module.exports = getUserRepairmentJob;
