const { Router } = require('express');
const Stat = require('../models/Stat');
const StatService = require('../services/StatService');

module.exports = Router()
  .post('/create', async (req, res, next) => {
    try {
      console.log('req.body', req.body);
      const data = await StatService.getAndSetStats(req.body);
      res.send(data);
    } catch (err) {
      next(err);
    }
  })
  .get('/key&year', async (req, res, next) => {
    try {
      const year = req.params.year;
      const key = req.params.key;
      const stats = await StatService.getByKeyAndYear(year, key);
      res.json(stats);
    } catch (err) {
      next(err);
    }
  });
