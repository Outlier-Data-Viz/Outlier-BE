const express = require('express');
const userController = require('../lib/controllers/user');
const topicController = require('../lib/controllers/topic');
const stateController = require('../lib/controllers/state');
const authController = require('./controllers/auth.js');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authController);
app.use('/api/v1/users', userController);
app.use('/api/v1/topics', topicController);
app.use('/api/v1/state', stateController);
// app.use('/api/v1/favorite', require('./controllers/favorite'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
