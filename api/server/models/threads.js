const mongoose = require('mongoose');

const threadsSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    dateCreated: {
        type: Date,
        required: true
    },
    subject: {
        type: String,
        required: true,
        minlength: [5, "Subject must be 5 characters or more."],
        maxlength: [101, "Subject must be less than 100 characters."]
    }
});

module.exports = mongoose.model('Threads', threadsSchema);