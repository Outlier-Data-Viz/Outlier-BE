const { Router } = require('express');
const Data = require('../models/Data');

module.exports = Router()
  .post('/create', async (req, res, next) => {
    try {
      const data = await Data.insert(req.body);
      res.send(data);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const data = await Data.selectAll();
      res.json(data);
    } catch (err) {
      next(err);
    }
  })

  .get('/state/:state', async (req, res, next) => {
    try {
      const state = req.params.state;
      const data = await Data.findByState(state);
      res.json(data);
    } catch (err) {
      next(err);
    }
  })

  .get('/topic/:topic', async (req, res, next) => {
    try {
      const topic = req.params.topic;
      const data = await Data.findByTopic(topic);
      res.json(data);
    } catch (err) {
      next(err);
    }
  })

  .get('/state&topic/:state&:topic', async (req, res, next) => {
    try {
      const state = req.params.state;
      const topic = req.params.topic;
      const data = await Data.findByStateAndTopic(state, topic);
      res.json(data);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await Data.findById(id);
      res.json(data);
    } catch (err) {
      next(err);
    }
  })

  .put('/:state', async (req, res, next) => {
    try {
      const id = req.params.id;
      const state = req.params.state;
      const topic = req.params.topic;
      const updateData = await Data.updateData(
        id,
        state,
        topic,
        req.body
      );
      res.send(updateData);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleteData = await Data.remove(id);
      res.send(deleteData);
    } catch (err) {
      next(err);
    }
  });
