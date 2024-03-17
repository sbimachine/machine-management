const CustomError = require('../../utils/CustomError');

const supervisior = (req, res, next) => {
  const { role } = req.userPayload;
  if (role !== 'supervisior') return next(new CustomError('only supervisior are allowed', 403));
  return next();
};
const leader = (req, res, next) => {
  const { role } = req.userPayload;
  if (role !== 'leader') return next(new CustomError('only leader are allowed', 403));
  return next();
};
const technician = (req, res, next) => {
  const { role } = req.userPayload;
  if (role !== 'teknisi') return next(new CustomError('only technician are allowed', 403));
  return next();
};
const produksi = (req, res, next) => {
  const { role } = req.userPayload;
  if (role !== 'produksi') return next(new CustomError('only produksi are allowed', 403));
  return next();
};

module.exports = { supervisior, leader, technician, produksi };
