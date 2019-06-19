const mongoose = require('mongoose');

const threadsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userAccountId: mongoose.Schema.Types.ObjectId,
    dateCreated: Date,
    subject: String
});

module.exports = mongoose.model('Threads', threadsSchema);