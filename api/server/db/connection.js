const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/ukiyo', { useNewUrlParser: true });

module.exports = db;