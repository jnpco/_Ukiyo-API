const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// MODEL IMPORT
const { USER } = require('../models/user');

const createAuthToken = (req, res) => {
    const { username, password } = req.body;

    USER.findOne({username: username}).select('+password')
        .then(user => {
            if(user){
                bcrypt.compare(password, user.password, (err) => {
                    if(err){
                        res.status(400).json({
                            message: "Authentication failed.",
                            err: err
                        });
                    } else {
                        // Send userId and role as payload to token
                        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRATION });
                        res.status(200).json({
                            success: true,
                            message: "Logged in successfully",
                            token: token
                        });
                    };
                })
            } 
            else { 
                res.status(401).json({
                    message: "Authentication failed."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: "Something went wrong, can't log in."
            });
        });
};

module.exports = {
    createAuthToken
}