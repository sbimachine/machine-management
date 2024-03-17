const asyncErrorhandler = require('../asyncErrorHandler');
const { User } = require('../../models');
const sendResponse = require('../../utils/sendResponse');

const registerController = asyncErrorhandler(async (req, res, next) => {
  const { firstName, lastName, email, password, phone, role, username } = req.body;
  await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    role,
    username,
  });

  sendResponse(res, 'akun berhasil dibuat', null, 201);
});

module.exports = registerController;
