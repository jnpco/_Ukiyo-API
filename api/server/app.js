const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

//ROUTES
const postsRoute = require('./routes/posts');
const threadsRoute = require('./routes/threads');
const usersRoute = require('./routes/users');
const errorRoute = require('./routes/error');

mongoose.connect("mongodb://localhost/ukiyo", { useNewUrlParser: true });

app.use(morgan('dev'));
app.use('/post', postsRoute);
app.use('/thread', threadsRoute);
app.use('/users', usersRoute);
app.use(errorRoute);


module.exports = app;