const mongoose = require('mongoose');

// MODEL IMPORT
const { USER_MODEL } = require('../models/User');

const getUser = (req, res) => {
    const userId = req.params.userId;
    USER_MODEL.findById(userId, (err, user) => {
        user ?
            res.status(200).json({
                success: true,
                data: user
            })
            :
            res.status(404).json({
                message: "User not found.",
                err: err
            })
    })
};

const getAllUsers = (req, res) => {
    USER_MODEL.find({})
        .then((users) => {
            res.status(200).json({
                success: true,
                data: users
            });
        }).catch((err) => {
            res.status(404).json({
                message: "No registered user.",
                err: err
            });
        });
};

const registerUser = (req, res) => {
    // -> Add Validation for both client and server
    const { username, password } = req.body;
    const user = new USER_MODEL({
        _id: new mongoose.Types.ObjectId(),
        username,
        password
    });

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
    const userId = req.params.userId;
    POST_MODEL.deleteOne({ _id: userId })
        .then((result) => {
            res.status(202).json({
                success: true,
                data: result
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Could not delete user.",
                err: err
            });
        });
}

module.exports = {
    getUser,
    getAllUsers,
    registerUser,
    deleteUser
}