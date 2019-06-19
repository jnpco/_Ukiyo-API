const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    threadId: mongoose.Schema.Types.ObjectId,
    userAccountId: mongoose.Schema.Types.ObjectId,
    content: String,
    dateCreated: Date
});

module.exports = mongoose.model('Posts', postsSchema);