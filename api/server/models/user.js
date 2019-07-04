const mongoose = require('mongoose');

mongoose.pluralize(null);

// Pre-save unique validation
const mongooseUniqueValidator = require('mongoose-unique-validator');

// Access level perms / Roles { ADMIN, MOD, USER }
const accessLevelPerms = require('../auth/accessLevelPerms');

// COLLECTION NAMES
const CN_USER = 'user';

const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true,
        minlength: [7, 'Username should be at least 7 characters in length.'],
        maxlength: [30, 'Username cannot be longer than 30 characters.'],
        unique: true
    },
    password: {
        // Password validation is in the controller
        type: String,
        required: true,
        select: false
    },
    altname: {
        type: String,
        minlength: [10, 'Alt name should be at least 10 characters in length.'],
        maxlength: [30, 'Alt name cannot be longer than 30 characters.']
    },
    role: {
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
        maxlength: [100, 'Status cannot be longer than 100 characters.']
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

module.exports = { USER: mongoose.model(CN_USER, userSchema), CN_USER };
