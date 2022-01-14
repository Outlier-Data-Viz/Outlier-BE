const { Router } = require('express');
const Favorite = require('../models/Favorite');

module.exports = Router()
  .post('/create', async (req, res, next) => {
    try {
      const entry = await Favorite.insert(req.body);
      res.send(entry);
    } catch (err) {
      next(err);
    }
  });

