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
const { Home, Post, Thread, Subforum, Forum, User, Auth, Error } = require('./routes');
app.get('/', Home)
app.use('/post', Post);
app.use('/thread', Thread);
app.use('/subforum', Subforum);
app.use('/forum', Forum);
app.use('/user', User);
app.use('/auth', Auth);
app.use(Error);

module.exports = app;