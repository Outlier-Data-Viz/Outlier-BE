const { Router } = require('express');
const Data = require('../models/Data');

module.exports = Router ()

  .post('/create', async (req, res, next) => {
    try {
      const data = await Data.insert(req.body);
      res.send(data);
    } catch(err) {
      next(err);
    }
  })

;
