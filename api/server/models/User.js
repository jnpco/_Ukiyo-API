const mongoose = require('mongoose');
mongoose.pluralize(null);
const mongooseUniqueValidator = require('mongoose-unique-validator');

const accessLevelPerms = require("../auth/accessLevelPerms");

// COLLECTION NAMES
const CN_USER = "user";

const userSchema = mongoose.Schema({
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
        select: false
        // Length validation is in the controller.
    },
    altname: {
        type: String,
        minlength: [15, "Alt name must be 15 characters or more."],
        maxlength: [31, "Alt name must be less than 30 characters."]
    },
    role: {
        // Predefined roles { ADMIN, MOD, USER }
        type: String,
        required: true,
        default: accessLevelPerms.MEMBER.name
    },
    avatar: {
        // Avatar URL
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
        sparse: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = {
    USER: mongoose.model(CN_USER, userSchema),
    CN_USER
};