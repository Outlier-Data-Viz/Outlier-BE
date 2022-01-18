const { Router } = require('express');
const Populations = require('../models/Populations');


module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const pops = await Populations.selectAll();
      res.json(pops);
    } catch (err) {
      next(err);
    }
  })

  .get('/:state_abrv', async (req, res, next) => {
    try {
      const state = req.params.state_abrv;
      const pops = await Populations.selectPopByState(state);
      res.json(pops);
    } catch(err) {
      next(err);
    }
  });
