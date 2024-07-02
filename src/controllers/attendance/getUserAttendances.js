const asyncErrorHandler = require('../asyncErrorHandler');
const getPagination = require('../../utils/getPagination');
const sendRespone = require('../../utils/sendResponse');
const { Attendance, Sequelize } = require('../../models');
const { excludeTimeStamp } = require('../../utils/responseFilter');

const getUserAttendancesController = asyncErrorHandler(async (req, res, next) => {
  const { sort, status, page = 1, limit = 10 } = req.query;
  let sortBy = [['createdAt', 'DESC']];
  if (sort === 'oldest') sortBy = [['createdAt', 'ASC']];
  if (sort === 'newest') sortBy = [['createdAt', 'DESC']];
  const offset = (parseInt(page) - 1) * parseInt(limit || 10);

  const conditions = {
    user_id: req.userPayload.id,
    ...(status ? { status } : {}),
  };

  const { count, rows: attendances } = await Attendance.findAndCountAll({
    where: conditions,
    ...(!sortBy ? {} : { order: sortBy }),
    offset,
    limit: parseInt(limit || 10),
    attributes: {
      exclude: excludeTimeStamp(),
      include: [[Sequelize.literal('created_at'), 'clockIn']],
    },
  });

  const pagination = getPagination(count, page, limit);

  const data = {
    attendances: !attendances || attendances.length == 0 ? [] : attendances,
    pagination,
  };
  sendRespone(res, 'Attendance list', data);
});

module.exports = getUserAttendancesController;
