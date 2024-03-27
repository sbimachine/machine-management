const CustomError = require('../../utils/CustomError');
const { createToken, createRefreshToken } = require('../../utils/jwtHelper');
const sendResponse = require('../../utils/sendResponse');
const asyncErrorHandler = require('../asyncErrorHandler');
const jwt = require('jsonwebtoken');
const refreshTokenController = asyncErrorHandler(async (req, res, next) => {
  const refreshToken = req.headers['refresh-token'];

  if (!refreshToken) return next(new CustomError('refresh-token is not provided', 401));
  const { REFRESH_TOKEN_SECRET_KEY, REFRESH_TOKEN_ISSUER } = process.env;

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY, { issuer: REFRESH_TOKEN_ISSUER }, (err, payload) => {
    if (err) return next(catchError(err));
    const { iss, iat, ...newPayload } = payload;
    const token = createToken(newPayload);
    const refreshToken = createRefreshToken(newPayload);

    sendResponse(res, 'Token created', { token, refreshToken });
  });
});

function catchError(err) {
  const { TokenExpiredError } = jwt;
  if (err instanceof TokenExpiredError) return new CustomError('Token Expired', 401);
  return new CustomError('Anauthorized', 401);
}

module.exports = refreshTokenController;
