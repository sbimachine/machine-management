const routes = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');
const attendanceRoutes = require('./attendance');
const categoryRoutes = require('./category');
const machineRoutes = require('./machine');

const prefix = '/api';

routes.use(`${prefix}/auth`, authRoutes);
routes.use(`${prefix}/user`, userRoutes);
routes.use(`${prefix}/attendance`, attendanceRoutes);
routes.use(`${prefix}/category`, categoryRoutes);
routes.use(`${prefix}/machine`, machineRoutes);

routes.get('/', (_, res) => {
  console.log('berhasil');
  res.status(200).json({ message: 'welcome' });
});
module.exports = routes;
