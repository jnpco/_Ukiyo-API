const mongoose = require('mongoose');
mongoose.pluralize(null);

// COLLECTION NAMES
const { USER_LABEL } = require('../models/User');
const { THREAD_LABEL } = require('../models/Thread');

const POST_LABEL = "post";

const postSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    [THREAD_LABEL]: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: THREAD_LABEL
    },
    [USER_LABEL]: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: USER_LABEL
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

module.exports = {
    POST_MODEL: mongoose.model(POST_LABEL, postSchema),
    POST_LABEL
}