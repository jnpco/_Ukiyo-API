const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// MODEL IMPORT
const { USER_MODEL } = require('../models/user');

const createAuthToken = (req, res) => {
    const { username, password } = req.body;

    USER_MODEL.findOne({username: username})
        .then(user => {
            if(user){
                bcrypt.compare(password, user.password, (err) => {
                    if(err){
                        res.status(400).json({
                            message: "Authentication failed.",
                            err: err
                        });
                    } else {
                        // Send userId as payload to token
                        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRATION });
                        res.status(200).json({
                            success: true,
                            message: "Logged in successfully",
                            data: { token }
                        });
                    };
                })
            } 
            else{ 
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