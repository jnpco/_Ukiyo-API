const express = require('express');
const app = express();
const morgan = require('morgan');
const db = require('./db/connection');

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//ROUTES
const postsRoute = require('./routes/posts');
const threadsRoute = require('./routes/threads');
const usersRoute = require('./routes/users');
const errorRoute = require('./routes/error');

app.use('/post', postsRoute);
app.use('/thread', threadsRoute);
app.use('/user', usersRoute);
app.use(errorRoute);

module.exports = app;