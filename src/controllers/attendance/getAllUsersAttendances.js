const asyncErrorHandler = require('../asyncErrorHandler');

const getPagination = require('../../utils/getPagination');
const sendRespone = require('../../utils/sendResponse');
const { Attendance, Sequelize, User } = require('../../models');
const { excludeTimeStamp } = require('../../utils/responseFilter');
const moment = require('moment');

const getAllUsersAttendances = asyncErrorHandler(async (req, res, next) => {
  const { sort = 'newest', status, page = 1, limit = 10, firstName, lastName, date, role } = req.query;
  let sortBy = null;
  if (sort === 'oldest') sortBy = [['createdAt', 'ASC']];
  if (sort === 'newest') sortBy = [['createdAt', 'DESC']];
  const offset = (parseInt(page) - 1) * parseInt(limit || 10);

  const conditions = {
    ...(status ? { status } : {}),
    ...(firstName ? { '$user.first_name$': { [Sequelize.Op.iLike]: `%${firstName.toLowerCase()}%` } } : {}),
    ...(lastName ? { '$user.last_name$': { [Sequelize.Op.iLike]: `%${lastName.toLowerCase()}%` } } : {}),
    ...(role ? { '$user.role$': role } : {}),
  };

  if (date) {
    const dayStart = moment(date).startOf('day').toISOString();
    const dayEnd = moment(date).endOf('day').toISOString();
    conditions.createdAt = { [Sequelize.Op.between]: [dayStart, dayEnd] };
  }
  const { count, rows: attendances } = await Attendance.findAndCountAll({
    where: conditions,
    ...(!sortBy ? {} : { order: sortBy }),
    offset,
    limit: parseInt(limit || 10),
    attributes: [
      'id',
      'status',
      'clockOut',
      'user_id',
      ['created_at', 'clockIn'], // Rename createdAt to clockIn
      [Sequelize.col('user.first_name'), 'firstName'], // Include firstName from User model
      [Sequelize.col('user.last_name'), 'lastName'], // Include lastName from User model
      [Sequelize.col('user.role'), 'role'], // Include lastName from User model
    ],
    include: [{ model: User, as: 'user', attributes: [] }],
  });
  const pagination = getPagination(count, page, limit);

  const data = {
    attendances: !attendances || attendances.length == 0 ? [] : attendances,
    pagination,
  };
  sendRespone(res, 'Attendance list', data);
});

module.exports = getAllUsersAttendances;
