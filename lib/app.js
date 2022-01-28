const express = require('express');
const user = require('./controllers/user');
const topic = require('./controllers/topic');
const state = require('./controllers/state');
const favorite = require('./controllers/favorite');
const auth = require('./controllers/auth');
const resources = require('./controllers/resources');
const population = require('./controllers/populations');
const stats = require('./controllers/stat');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// I can see why you would use the word controller in your variable names, but kind of unnecessary
// All of the first parameters `app.use()` functions take in a route, so it would be implied the second arg here is a controller
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', user);
app.use('/api/v1/topics', topic);
app.use('/api/v1/state', state);
app.use('/api/v1/favorite', favorite);
app.use('/api/v1/stats', stats);
app.use('/api/v1/resources', resources);
app.use('/api/v1/populations', population);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
