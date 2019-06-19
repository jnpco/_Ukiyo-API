const express = require('express');
const app = express();
const morgan = require('morgan');

const postRoute = require('./routes/post');
const threadRoute = require('./routes/thread');
const usersRoute = require('./routes/users');
const errorRoute = require('./routes/error');

app.use(morgan('dev'));

app.use('/post', postRoute);
app.use('/thread', threadRoute);
app.use('/users', usersRoute);
app.use(errorRoute);


module.exports = app;