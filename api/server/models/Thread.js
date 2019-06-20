const mongoose = require('mongoose');

const COLLECTION_NAME = "Thread";

const threadsSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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

module.exports = mongoose.model(COLLECTION_NAME, threadsSchema);