const mongoose = require('mongoose');

// MODEL IMPORT
const { POST_MODEL } = require('../models/post');
// COLLECTION NAMES
const { USER_LABEL } = require('../models/user');
const { THREAD_LABEL } = require('../models/thread');

// TODO: Add permission requirements for ops

const getPost = (req, res) => {
    const postId = req.params.postId;
    POST_MODEL.findById(postId)
        .then((post) => {
            if (post.archived) {
                res.status(404).json({
                    message: "Post not found.",
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: post
                });
            }
        }).catch((err) => {
            res.status(404).json({
                message: "Post not found.",
                err: err
            });
        });
};

const getAllPosts = (req, res) => {
    const threadId = req.params.threadId;
    POST_MODEL.find({ [THREAD_LABEL]: threadId, archived: false })
        .populate(USER_LABEL)
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
    const { userId } = req.authorization;
    const { threadId, content } = req.body;
    const post = new POST_MODEL({
        _id: new mongoose.Types.ObjectId(),
        [THREAD_LABEL]: threadId,
        [USER_LABEL]: userId,
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

const archivePost = (req, res) => {
    const { userId } = req.authorization;
    const { postId } = req.body;
    POST_MODEL.updateOne({ _id: postId, user: userId }, { $set: { archived: true, dateDeleted: Date.now() } })
        .then((result) => {
            res.status(202).json({
                success: true,
                data: result
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Could not delete post.",
                err: err
            });
        });
};

const archiveAllPosts = (threadId) => {
    POST_MODEL.updateMany({ thread: threadId }, { $set: { archived: true, dateDeleted: Date.now() } })
        .then((result) => {
            res.status(202).json({
                success: true,
                data: result
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Could not delete posts.",
                err: err
            });
        });
};

const deletePost = (req, res) => {
    const { postId } = req.body;
    POST_MODEL.deleteOne({ _id: postId, user: userId })
        .then((result) => {
            res.status(202).json({
                success: true,
                data: result
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Post cannot be permanently deleted.",
                err: err
            });
        });
};

const deleteAllPosts = (threadId) => {
    POST_MODEL.deleteMany({ thread: threadId })
        .then((result) => {
            res.status(202).json({
                success: true,
                data: result
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Could not delete posts.",
                err: err
            });
        });
};

module.exports = {
    getPost,
    getAllPosts,
    createPost,
    archivePost,
    archiveAllPosts,
    deletePost,
    deleteAllPosts
};