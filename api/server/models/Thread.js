const mongoose = require('mongoose');
mongoose.pluralize(null);

// COLLECTION NAMES
const { USER_LABEL } = require('../models/User');

const THREAD_LABEL = "thread";

const threadSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    [USER_LABEL]: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: USER_LABEL
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    subject: {
        type: String,
        required: true,
        minlength: [5, "Subject must be 5 characters or more."],
        maxlength: [101, "Subject must be less than 100 characters."]
    }
});

module.exports = {
    THREAD_MODEL: mongoose.model(THREAD_LABEL, threadSchema),
    THREAD_LABEL
};