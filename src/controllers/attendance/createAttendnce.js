const CustomError = require('../../utils/CustomError');
const asyncErrorHandler = require('../asyncErrorHandler');
const { User, Attendance } = require('../../models');
const sendResponse = require('../../utils/sendResponse');
const { Op } = require('sequelize');

const createAttendanceController = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.userPayload;
  const { status, action, attendanceId } = req.body;

  const user = await User.findByPk(id);
  if (!user) return next(new CustomError('User not found', 404));

  if (action) {
    const attendance = await Attendance.findByPk(attendanceId);
    if (!attendance) return next(new CustomError('Attendance not found', 404));

    attendance.set({ clockOut: new Date(), status: action }, { returning: true });
    await attendance.save();
    return sendResponse(res, 'attendace updated', attendance);
  }
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

  if (attendance && attendance.length !== 0) return next(new CustomError('You already make an attendance today', 409));
  await user.createAttendance({ status });
  sendResponse(res, 'created', null, 201);
});

module.exports = createAttendanceController;
