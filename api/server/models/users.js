const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    altname: String,
    role: String,
    avatar: String,
    dateJoined: Date,
    bio: String,
    status: String,
    email: String
});

module.exports = mongoose.model('Users', usersSchema);