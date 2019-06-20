const User = require('../models/User');
const mongoose = require('mongoose');

const getUser = (req, res) => {
    const userId = req.params.userId;
    User.findById(userId, (err, user) => {
        user ?
            res.status(200).json({
                success: true,
                data: user
            })
            :
            res.status(404).json({
                message: "User not found",
                err: err
            })
    })
};

const registerUser = (req, res) => {
    // Validation both client and server
    const { username, password } = req.body;
    const user = new User({ _id: new mongoose.Types.ObjectId(), username, password });

    user.save()
        .then((newUser) => {
            res.status(201).json({
                success: true,
                data: newUser
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Could not register user.",
                err: err
            });
        });
};

const deleteUser = (req, res) => {
    res.status(200).json({
        message: "DEL req user"
    });
}

module.exports = {
    getUser,
    registerUser,
    deleteUser
}