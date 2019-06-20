const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const db = require('./db/connection');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Listening to port", PORT)
});