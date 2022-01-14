const express = require('express');
// const authController = require('../lib/controllers/auth');
const userController = require('../lib/controllers/user');
const cors = require('cors');
// const cookieParser = require('cookie-parser');

const app = express();

app.use(cors(
//   {
//   origin: true,
//   credentials: true
// }
));
app.use(express.json());
// app.use(cookieParser());

// app.use('/api/v1/auth', authController);
app.use('/api/v1/users', userController);
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
