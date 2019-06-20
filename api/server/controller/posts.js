const Post = require('../models/Post');
const mongoose = require('mongoose');

const getPost = (req, res) => {
    const postId = req.params.postId;
    Post.findById(postId).then((user) => {
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
    Post.find({}).populate('user').then((posts) => {
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
    const { threadId, userId, content, dateCreated } = req.body;
    const post = new Post({ _id: new mongoose.Types.ObjectId(), threadId, userId, content, dateCreated });

    post.save()
        .then((post) => {
            res.status(201).json({
                success: true,
                data: post
            });
        }).catch((err) => {
            res.status(500).json({
                message: err
            });
        });
};


module.exports = { createPost, getPost, getAllPosts };