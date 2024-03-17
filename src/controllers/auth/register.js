const asyncErrorhandler = require('../asyncErrorHandler');
const { User } = require('../../models');

const registerController = asyncErrorhandler(async (req, res, next) => {
  const { firstName, lastName, email, password, phone, role } = req.body;
  await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    role,
  });

  return res.status(201).json({ message: 'akun berhasil dibuat', data: {} });
});

module.exports = registerController;
