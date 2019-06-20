const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const COLLECTION_NAME = "User";

const usersSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true,
        minlength: [7, "Username must be 7 characters or more."],
        maxlength: [31, "Username must be less than 30 characters."],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [10, "Password must be 10 characters or more."],
        maxlength: [101, "Passwords must be less than 100 characters."]
    },
    altname: {
        type: String,
        minlength: [15, "Alt name must be 15 characters or more."],
        maxlength: [31, "Alt name must be less than 30 characters."]
    },
    role: {
        // Predefined roles
        type: String
    },
    avatar: {
        // Link
        type: String
    },
    dateJoined: {
        type: Date,
        default: Date.now()
    },
    bio: {
        type: String,
        maxlength: 400
    },
    status: {
        type: String,
        maxlength: [101, "Status must be less than 100 characters."]
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        index: true,
        sparse: true
    }
});

usersSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model(COLLECTION_NAME, usersSchema);