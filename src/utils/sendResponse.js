module.exports = function sendResponse(res, message, data = null, status = 200) {
  return res.status(status).json({ status: 'success', message, data });
};
