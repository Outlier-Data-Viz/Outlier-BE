const { Router } = require('express');
const Stat = require('../models/Stat');
const StatService = require('../services/StatService');

module.exports = Router()
  .post('/create', async (req, res, next) => {
    try {
      console.log('req.body', req.body);
      const data = await StatService.getAndSetStats(req.body);
      // console.log('controller data', data);
      res.send(data);
    } catch (err) {
      next(err);
    }
  })

  .get('/:key', async (req, res, next) => {
    // console.log('rec', req);
    try {
      // console.log('req.params', req.params);
      const key = req.params.key;
      const stats = await Stat.fandByKey(key);
      res.json(stats);
    } catch (err) {
      next(err);
    }
  });
