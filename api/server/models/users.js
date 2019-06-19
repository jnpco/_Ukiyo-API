const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    username: { type: String, required: true, min: 15, max: 30 },
    password: { type: String, required: true, min: 10 },
    altname: { type: String, required: true, min: 15, max: 30 },
    role: { type: String },
    avatar: { type: String },
    dateJoined: { type: Date, required: true },
    bio: { type: String, max: 400 },
    status: { type: String, max: 100 },
    email: { type: String }
});

module.exports = mongoose.model('Users', usersSchema);