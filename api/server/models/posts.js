const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    threadId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Threads'
    },
    userAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    content: {
        type: String,
        required: true,
        minlength: [5, "Post must be 5 characters or more."],
        maxlength: [1001, "Post must be less than 1000 characters."]
    },
    dateCreated: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Posts', postsSchema);