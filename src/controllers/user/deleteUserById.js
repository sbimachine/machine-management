const asyncErrorHandler = require('../asyncErrorHandler');
const { User } = require('../../models');
const sendResponse = require('../../utils/sendResponse');
const deleteUserByIdController = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) return next(new CustomError('User does not exist', 404));
  await user.destroy();
  sendResponse(res, 'User deleted');
});

module.exports = deleteUserByIdController;
