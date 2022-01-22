const { Router } = require('express');
const Stat = require('../models/Stat');
const StatService = require('../services/StatService');

module.exports = Router()
  .post('/create', async (req, res, next) => {
    try {
      const data = await StatService.getAndSetStats(req.body);
      res.send(data);
    } catch (err) {
      next(err);
    }
  })

  .get('/key/:key/state/:state', async (req, res, next) => {
    try {
      const state = req.params.state;
      const key = req.params.key;
      const stats = await Stat.findByKey(key, state);
      res.send(stats);
    } catch (err) {
      next(err);
    }
  });
