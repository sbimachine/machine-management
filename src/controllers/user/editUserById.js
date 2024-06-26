const asyncErrorHandler = require('../asyncErrorHandler');
const { User } = require('../../models');
const sendResponse = require('../../utils/sendResponse');
const editUserByIdController = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) return next(new CustomError('User does not exist', 404));
  user.set(req.body);
  await user.save();
  sendResponse(res, 'User data changed');
});

module.exports = editUserByIdController;
