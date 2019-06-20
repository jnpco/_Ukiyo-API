const mongoose = require('mongoose');

// MODEL IMPORT
const { POST_MODEL } = require('../models/Post');
// COLLECTION NAMES
const { USER_LABEL } = require('../models/User');
const { THREAD_LABEL } = require('../models/Thread');

const getPost = (req, res) => {
    const postId = req.params.postId;
    POST_MODEL.findById(postId)
        .then((user) => {
            res.status(200).json({
                success: true,
                data: user
            });
        }).catch((err) => {
            res.status(404).json({
                message: "Post not found.",
                err: err
            });
        });
};

const getAllPosts = (req, res) => {
    POST_MODEL.find({})
        .populate(USER_LABEL)
        .populate(THREAD_LABEL)
        .then((posts) => {
            res.status(200).json({
                success: true,
                data: posts
            });
        }).catch((err) => {
            res.status(404).json({
                message: "Nothing posted here",
                err: err
            });
        });
};

const createPost = (req, res) => {
    const { thread, user, content } = req.body;
    const post = new POST_MODEL({
        _id: new mongoose.Types.ObjectId(),
        [THREAD_LABEL]: thread,
        [USER_LABEL]: user,
        content
    });

    post.save()
        .then((post) => {
            res.status(201).json({
                success: true,
                data: post
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Could not create post.",
                err: err
            });
        });
};

module.exports = {
    getPost,
    getAllPosts,
    createPost
};