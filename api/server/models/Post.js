const mongoose = require('mongoose');
mongoose.pluralize(null);

// COLLECTION NAMES
const { CN_USER } = require('./user');
const { CN_THREAD } = require('./thread');

const CN_POST = "post";

const postSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    [CN_THREAD]: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: CN_THREAD
    },
    [CN_USER]: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: CN_USER
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
    },
    dateDeleted: {
        type: Date,
    }
});

module.exports = {
    POST: mongoose.model(CN_POST, postSchema),
    CN_POST
}