const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

// ROUTES
const Route = require('./routes');

// MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send("Ukiyo-API"))
app.use('/post', Route.Post);
app.use('/thread', Route.Thread);
app.use('/user', Route.User);
app.use('/auth', Route.Auth);
app.use(Route.Error);

module.exports = app;