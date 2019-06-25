const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//ROUTES
const Route = require('./routes');

app.get('/', (req, res) => res.send("Ukiyo-API"))
app.use('/post', Route.Post);
app.use('/thread', Route.Thread);
app.use('/user', Route.User);
app.use(Route.Error);

module.exports = app;