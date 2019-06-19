const mongoose = require('mongoose');

const threadsSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    userAccountId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
    dateCreated: { type: Date, required: true },
    subject: { type: String, required: true }
});

module.exports = mongoose.model('Threads', threadsSchema);