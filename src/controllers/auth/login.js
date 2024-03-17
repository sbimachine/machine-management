const asyncErrorHandler = require('../asyncErrorHandler');
const { User } = require('../../models');
const CustomError = require('../../utils/CustomError');
const { createToken, createRefreshToken } = require('../../utils/jwtHelper');

const loginController = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return next(new CustomError('email is required', 400));
  if (!password) return next(new CustomError('password is required', 400));
  const user = await User.findOne({
    where: {
      email,
    },
    attributes: {
      exclude: ['deletedAt', 'createdAt', 'updatedAt'],
    },
  });

  if (!user) return next(new CustomError('username or password is wrong!', 401));

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) return next(new CustomError('username or password is wrong!', 401));

  delete user.dataValues.password;

  const token = createToken({ ...user.dataValues });
  const refreshToken = createRefreshToken({ ...user.dataValues });
  return res.status(200).json({ msg: 'success', data: { token, refresh_token: refreshToken } });
});

module.exports = loginController;
