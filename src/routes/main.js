const routes = require('express').Router();
const authRoutes = require('./auth');

const prefix = '/api';

routes.use(`${prefix}/auth`, authRoutes);
routes.get('/', (_, res) => {
  console.log('berhasil');
  res.status(200).json({ message: 'welcome' });
});
module.exports = routes;
