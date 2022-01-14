const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Topic = require('../models/Topics');


module.exports = Router()

  .get('/', async (req, res, next) => {
    try {
      const topics = await Topic.selectAll();
      res.json(topics);
    } catch (err) {
      next(err);
    }
  })

  .post('/create', async (req, res, next) => {
    try {
      const topic = await Topic.insert(req.body);
      res.send(topic);
    } catch(err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const topic = await Topic.findById(id);
      res.send(topic);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleteTop = await Topic.remove(id);
      res.send(deleteTop);
    } catch(err) {
      next(err);
    }
  });
  
