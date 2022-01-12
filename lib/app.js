const express = require('express');
const userController = require('../lib/controllers/auth');
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', userController)
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
