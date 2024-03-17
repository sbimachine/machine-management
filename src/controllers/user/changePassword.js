const asyncErrorHandler = require('../asyncErrorHandler');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const sendResponse = require('../../utils/sendResponse');
const CustomError = require('../../utils/CustomError');

const changePasswordController = asyncErrorHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.userPayload;
  const user = await User.findByPk(id, {
    attributes: ['password', 'id'],
  });
  if (!user) return next(new CustomError('User does not exist', 404));

  const isValidPassword = bcrypt.compare(oldPassword, user.password);
  if (!isValidPassword) return next(new CustomError('Wrong password', 401));

  const updatedPassword = await bcrypt.hash(newPassword, 10);
  user.set({
    password: updatedPassword,
  });
  await user.save();
  sendResponse(res, 'Password changed');
});

module.exports = changePasswordController;
