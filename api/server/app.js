const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

// MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
const Route = require('./routes');
app.get('/', Route.Home)
app.use('/post', Route.Post);
app.use('/thread', Route.Thread);
app.use('/subforum', Route.Subforum);
app.use('/forum', Route.Forum);
app.use('/user', Route.User);
app.use('/auth', Route.Auth);
app.use(Route.Error);

module.exports = app;