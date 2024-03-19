const asyncErrorHandler = require('../asyncErrorHandler');
const { User } = require('../../models');
const sendResponse = require('../../utils/sendResponse');
const { Op } = require('sequelize');
const getCurrentAttendance = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findByPk(req.userPayload.id);
  if (!user) return next(new CustomError('User not found', 404));

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const attendance = await user.getAttendance({
    where: {
      createdAt: {
        [Op.between]: [todayStart, todayEnd],
      },
    },
  });

  if (!attendance || attendance.length === 0) return next(new CustomError('Attendance not found', 404));
  sendResponse(res, 'list', attendance[0]);
});

module.exports = getCurrentAttendance;
