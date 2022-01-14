const { Router } = require('express');
const Topic = require('../models/Topics');


module.exports = Router()
  .post('/create', async (req, res, next) => {
    try {
      const topic = await Topic.insert(req.body);
      res.send(topic);
    } catch(err) {
      next(err);
    }
  });
  
