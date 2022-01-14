const express = require('express');
// const authController = require('../lib/controllers/auth');
const userController = require('./controllers/user');
const stateController = require('./controllers/state');
// const cookieParser = require('cookie-parser');

const app = express();

// app.use(cors({
//   origin: true,
//   credentials: true
// }));
app.use(express.json());
// app.use(cookieParser());

// app.use('/api/v1/auth', authController);
app.use('/api/v1/users', userController);
app.use('/api/v1/state', stateController);
// app.use('/api/v1/favorite', require('./controllers/favorite'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
