const { Router } = require('express');
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

  // .get('/', async (req, res, next) => {
  //   try {
  //     res.send({ hello: 'gabriel' });
      
  //   } catch (err) {
  //     next(err);
  //   }
  // })
    
  .get('/:key', async (req, res, next) => {
    // console.log('rec', req);
    try {
      console.log('req.params', req.params);
      const key = req.params.key;
      const stats = await StatService.getByKeyAndYear(key);
      res.json(stats);
    } catch (err) {
      next(err);
    }
  });
