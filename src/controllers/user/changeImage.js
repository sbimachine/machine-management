const asyncErrorHandler = require('../asyncErrorHandler');
const { User } = require('../../models');
const CustomError = require('../../utils/CustomError');
const sendResponse = require('../../utils/sendResponse');
const changeUserImageController = asyncErrorHandler(async (req, res, next) => {
  const {
    image,
    userPayload: { id },
  } = req;
  const user = await User.findByPk(id);
  if (!user) return next(new CustomError('User not found', 404));

  user.set({ imageUrl: image }, { returning: true });

  await user.save();
  sendResponse(res, 'Image changed', user);
});

module.exports = changeUserImageController;
