const jwt = require('jsonwebtoken');
const CustomError = require('../../utils/CustomError');
const asyncErrorhandler = require('../../controllers/asyncErrorhandler');

const verifyToken = asyncErrorhandler(async (req, res, next) => {
  if (!req.headers.authorization) return next(new CustomError('no token provided', 401));

  const token = req.headers.authorization.split(' ').filter((value) => value !== 'Bearer')[0];
  if (!token) return next(new CustomError('no token provided', 401));

  const { SECRET_KEY, ISSUER } = process.env;
  jwt.verify(token, SECRET_KEY, { issuer: ISSUER }, (err, payload) => {
    if (err) return next(catchError(err));
    req.userPayload = payload;
    return next();
  });
});

function catchError(err) {
  const { TokenExpiredError } = jwt;
  if (err instanceof TokenExpiredError) return new CustomError('Token Expired', 401);
  return new CustomError('Unauthorized', 401);
}
module.exports = verifyToken;
