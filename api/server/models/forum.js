const mongoose = require('mongoose');

mongoose.pluralize(null);

// COLLECTION NAMES
const CN_FORUM = 'forum';
const { CN_USER } = require('./user');

const forumSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    [CN_USER]: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: CN_USER
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    subject: {
        type: String,
        required: true,
        minlength: [5, 'Subject should be at least 5 characters in length.'],
        maxlength: [100, 'Subject cannot be longer than 100 characters.']
    },
    archived: {
        type: Boolean,
        required: true,
        default: false
    },
    dateDeleted: {
        type: Date
    }
});

module.exports = { FORUM: mongoose.model(CN_FORUM, forumSchema), CN_FORUM };
