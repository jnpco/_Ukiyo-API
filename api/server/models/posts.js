const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    threadId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Threads' },
    userAccountId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
    content: { type: String, required: true, max: 1000 },
    dateCreated: { type: Date, required: true }
});

module.exports = mongoose.model('Posts', postsSchema);