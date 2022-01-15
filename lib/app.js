const express = require('express');
const userController = require('./controllers/user');
const topicController = require('./controllers/topic');
const stateController = require('./controllers/state');
const favoriteController = require('./controllers/favorite');
const dataController = require('./controllers/data');
const cors = require('cors');



const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userController);
app.use('/api/v1/topics', topicController);
app.use('/api/v1/state', stateController);
app.use('/api/v1/favorite', favoriteController);
app.use('/api/v1/data', dataController);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
