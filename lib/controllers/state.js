const { Router } = require('express');
const State = require('../models/State');

module.exports = Router()
  // .post('/', async (req, res, next) => {
  //   try {
  //     const entry = await State.insert(req.body);
  //     res.send(entry);
  //   } catch (error) {
  //     next(error);
  //   }
  // })

  .get('/', async (req, res, next) => {
    try {
      const allStates = await State.getAllStates();
      res.json(allStates);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.state_id;
      const state = await State.getState(id);
      res.json(state);
    } catch (err) {
      next(err);
    }
  });
