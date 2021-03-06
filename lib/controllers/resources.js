const { Router } = require('express');
const Resources = require('../models/Resources');

module.exports = Router()
  .post('/create', async (req, res, next) => {
    try {
      const entry = await Resources.insert(req.body);
      res.send(entry);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const savedResource = await Resources.getAllResources();
      res.send(savedResource);
    } catch (error) {
      next(error);
    }
  });
