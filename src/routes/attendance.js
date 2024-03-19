const createAttendanceController = require('../controllers/attendance/createAttendnce');
const getCurrentAttendance = require('../controllers/attendance/currentAttendance');
const { verifyToken } = require('../middlewares/auth/');

const routes = require('express').Router();

routes.post('/create', verifyToken, createAttendanceController);
routes.get('/current', verifyToken, getCurrentAttendance);

module.exports = routes;
