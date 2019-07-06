const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// MODEL IMPORT
const { USER } = require('../models/user');

const getAllUsers = (req, res) => {
    USER.find({})
        .select('-password')
        .then(users => {
            res.status(200).json({
                success: true,
                message: `${users.length ? `${users.length} users fetched from database.` : 'No users available.'}`,
                users
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong. Cannot fetch users. Try again later.',
                err
            });
        });
};

const getUser = (req, res) => {
    const { userId } = req.params;

    USER.findOne({ _id: userId })
        .then(user => {
            if (user) {
                res.status(200).json({
                    success: true,
                    message: `User #${userId} cannot be found.`,
                    user
                });
            } else {
                res.status(404).json({
                    message: `User #${userId} cannot be found.`,
                    err: "User doesn't exist"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong. Cannot fetch user. Try again later.',
                err
            });
        });
};

const createUser = (req, res) => {
    const { username, password } = req.body;

    if (password.length < 10) {
        res.status(400).json({ 
            message: 'Password must be 10 characters or more.', 
            err: 'Password must be 10 characters or more.' 
        });
    } else if (password.length > 100) {
        res.status(400).json({ 
            message: 'Password must not be longer than 100 characters.',
            err: 'Password must not be longer than 100 characters.' 
        });
    } else {
        bcrypt.hash(password, 10, (err, hashed) => {
            if (err) {
                res.status(500).json({
                    message: 'Something went wrong. Cannot register user. Try again later.',
                    err
                });
            } else {
                const user = new USER({
                    _id: new mongoose.Types.ObjectId(),
                    username,
                    password: hashed
                });
                user.save()
                    .then(userWithPassword => {
                        const { password, ...userData } = userWithPassword.toObject();
                        res.status(201).json({ 
                            success: true,
                            message: `Successfully registered ${userData.username}`,
                            userData 
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'Something went wrong. Cannot register user. Try again later.',
                            err
                        });
                    });
            }
        });
    }
};

const deleteUser = (req, res) => {
    const { userId } = req.params;
    USER.deleteOne({ _id: userId })
        .then(result => {
            res.status(202).json({
                success: true,
                message: `Successfully deleted User #${userId}`,
                result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong. Cannot delete user. Try again later.',
                err
            });
        });
};

module.exports = { getUser, getAllUsers, createUser, deleteUser };
