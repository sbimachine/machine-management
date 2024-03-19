const routes = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');
const attendanceRoutes = require('./attendance');

const prefix = '/api';

routes.use(`${prefix}/auth`, authRoutes);
routes.use(`${prefix}/user`, userRoutes);
routes.use(`${prefix}/attendance`, attendanceRoutes);

routes.get('/', (_, res) => {
  console.log('berhasil');
  res.status(200).json({ message: 'welcome' });
});
module.exports = routes;
