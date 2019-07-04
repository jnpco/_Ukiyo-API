const http = require('http');
const app = require('./app');
const server = http.createServer(app);

// ENVIRONMENTAL VARIABLES
const dotenv = require('dotenv');
dotenv.config();

// CONNECTING TO DATABASE
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true });

// SETTING UP PORT
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log('Listening to port', PORT);
});
