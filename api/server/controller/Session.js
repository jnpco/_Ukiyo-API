const bcrypt = require('bcrypt');

// MODEL IMPORT
const { USER_MODEL } = require('../models/User');

const login = (req, res) => {
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
                        res.status(200).json({
                            success: true,
                            message: "Logged in successfully"
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

const logout = (req, res) => {

};

module.exports = {
    login,
    logout
}