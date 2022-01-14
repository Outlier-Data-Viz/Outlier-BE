const { Router } = require('express');
const State = require('../models/State');

module.exports = Router()
  .post('/create', async (req, res, next) => {
    try {
      const entry = await State.insert(req.body);
      res.send(entry);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const allStates = await State.getAllStates();
      res.json(allStates);
    } catch (err) {
      next(err);
    }
  })

  .get('/:stateName', async (req, res, next) => {
    try {
      const name = req.params.stateName;
      const state = await State.getState(name);
      res.json(state);
    } catch (err) {
      next(err);
    }
  });
