const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// MODEL IMPORT
const { USER } = require('../models/user');

const getUser = (req, res) => {
    const userId = req.params.userId;

    USER.findOne({_id: userId})
        .then(user => {
            if (user) {
                res.status(200).json({
                    success: true,
                    data: user
                })
            } else {
                res.status(404).json({
                    message: "User not found.",
                    err: err
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: "Something went wrong. Cannot fetch user.",
                err: err
            });
        });
};

// TODO: Change error, catch shouldnt be specific
const getAllUsers = (req, res) => {
    USER.find({}).select("-password")
        .then((users) => {
            res.status(200).json({
                success: true,
                data: users
            });
        }).catch((err) => {
            res.status(404).json({
                message: "No registered users.",
                err: err
            });
        });
};

const createUser = (req, res) => {
    const { username, password } = req.body;

    if(password.length < 10){
        res.status(500).json({
            err: "Password must be 10 characters or more.",
        });
    }
    else if(password.length > 100){
        res.status(201).json({
            err: "Password must not be longer than 100 characters."
        });
    }
    else{
        bcrypt.hash(password, 10, (err, hashed) => {
            if(err){
                return res.status(500).json({
                    message: "Could not register user.",
                    err: err
                })
            } else {
                const user = new USER({
                    _id: new mongoose.Types.ObjectId(),
                    username,
                    password: hashed
                });
                user.save()
                    .then((newUser) => {
                        const {password, ...user} = newUser.toObject();
                        res.status(201).json({
                            success: true,
                            data: user
                        });
                    }).catch((err) => {
                        res.status(500).json({
                            message: "Could not register user.",
                            err: err
                        });
                    });
            }
        })
    };
}

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
    createUser,
    deleteUser
}