const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// MODEL IMPORT
const { USER } = require('../models/user');

const createAuthToken = (req, res) => {
    const { username, password } = req.body;

    USER.findOne({ username })
        .select('+password')
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password)
                    .then(match => {
                        if(match) {
                            const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY, {
                                expiresIn: process.env.JWT_EXPIRATION
                            });
                            res.status(200).json({
                                success: true,
                                message: 'Auth token created successfully.',
                                token
                            });
                        }
                        else {
                            res.status(401).json({
                                message: 'Authentication failed.',
                                err: 'Check your username or password.'
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'Something went wrong. Cannot create token. Try again later.',
                            err
                        });
                    });
            }
            else {
                res.status(401).json({
                    message: 'Authentication failed.',
                    err: 'Check your username or password.'
                });
            }
    });
}

module.exports = { createAuthToken };
