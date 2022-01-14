const express = require('express');
const userController = require('../lib/controllers/user');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userController);
app.use('/api/v1/state', stateController);
// app.use('/api/v1/favorite', require('./controllers/favorite'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
