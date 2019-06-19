const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const User = require('../models/users');

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    // Check ID validity
    res.status(200).json({
        message: "GET req user " + userId
    });
});

// SIGNUP
router.post('/', (req, res) => {
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
                message: err
            });
        });
});

router.delete('/', (req, res) => {
    res.status(200).json({
        message: "DEL req user"
    });
});


module.exports = router;