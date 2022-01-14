const express = require('express');
const userController = require('./controllers/user');
const topicController = require('./controllers/topic');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userController);
app.use('/api/v1/topics', topicController);
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
