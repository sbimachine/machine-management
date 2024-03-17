const asyncErrorHandler = require('../asyncErrorHandler');
const { User, Sequelize } = require('../../models');
const CustomError = require('../../utils/CustomError');
const { createToken, createRefreshToken } = require('../../utils/jwtHelper');
const sendResponse = require('../../utils/sendResponse');

const loginController = asyncErrorHandler(async (req, res, next) => {
  const { emailOrUsername, password } = req.body;
  if (!emailOrUsername) return next(new CustomError('email or username is required', 400));
  if (!password) return next(new CustomError('password is required', 400));
  const { Op } = Sequelize;
  const user = await User.findOne({
    where: {
      [Op.or]: [{ username: emailOrUsername }, { email: emailOrUsername }],
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
  sendResponse(res, 'Login success', { token, refreshToken });
  // return res.status(200).json({ message: 'success', data: { token, refreshToken } });
});

module.exports = loginController;
