const createAttendanceController = require('../controllers/attendance/createAttendnce');
const getCurrentAttendance = require('../controllers/attendance/currentAttendance');
const getAllUsersAttendances = require('../controllers/attendance/getAllUsersAttendances');
const getUserAttendancesController = require('../controllers/attendance/getUserAttendances');
const { verifyToken, allowRole } = require('../middlewares/auth/');

const routes = require('express').Router();

routes.post('/create', verifyToken, createAttendanceController);
routes.get('/current', verifyToken, getCurrentAttendance);
routes.get('/user-attendances/all', verifyToken, allowRole('supervisior', 'leader'), getAllUsersAttendances);
routes.get('/user-attendances', verifyToken, getUserAttendancesController);

module.exports = routes;
