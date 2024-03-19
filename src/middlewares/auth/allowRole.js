const CustomError = require('../../utils/CustomError');

const allowRole = (...allowed) => {
  return (req, res, next) => {
    const { role } = req.userPayload;
    let isAllowed = false;
    for (let allowedRole of allowed) {
      if (allowedRole !== role) continue;
      isAllowed = true;
      break;
    }
    if (!isAllowed) return next(new CustomError('Forbidden', 403));
    next();
  };
};
module.exports = allowRole;
