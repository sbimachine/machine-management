const asyncErrorHandler = require('../asyncErrorHandler');
const { User } = require('../../models');
const CustomError = require('../../utils/CustomError');
const sendResponse = require('../../utils/sendResponse');

const getDetailUserController = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.userPayload;
  const user = await User.findByPk(id, {
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
  });
  if (!user) return next(new CustomError('User not found', 404));

  return sendResponse(res, 'User detail', user);
});

module.exports = getDetailUserController;
