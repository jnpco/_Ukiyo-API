const express = require('express');
const app = express();
const morgan = require('morgan');

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//ROUTES
const Route = require('./routes');

app.use('/post', Route.Post);
app.use('/thread', Route.Thread);
app.use('/user', Route.User);
app.use(Route.Error);

module.exports = app;