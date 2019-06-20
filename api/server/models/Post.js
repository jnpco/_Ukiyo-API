const mongoose = require('mongoose');

const COLLECTION_NAME = "Post";

const postsSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    thread: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Thread'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
        minlength: [5, "Post must be 5 characters or more."],
        maxlength: [1001, "Post must be less than 1000 characters."]
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    archived: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model(COLLECTION_NAME, postsSchema);