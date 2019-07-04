const mongoose = require('mongoose');

// MODEL IMPORT
const { POST } = require('../models/post');
// COLLECTION NAMES
const { CN_USER } = require('../models/user');
const { CN_THREAD } = require('../models/thread');

const getAllPosts = (req, res) => {
    const { thread } = req.query;

    POST.find({ [CN_THREAD]: thread, archived: false })
        .populate(CN_USER)
        .then((posts) => {
            res.status(200).json({ success: true, message: `${posts.length ? posts.length + ' posts fetched from database.' 
                                                                            : 'No posts available.' }`, data: posts });
        }).catch((err) => {
            res.status(500).json({ message: 'Something went wrong. Cannot fetch posts. Try again later.', err: err });
        });
};

const createPost = (req, res) => {
    const { userId } = req.authorization;
    const { threadId, content } = req.body;

    const post = new POST({ _id: new mongoose.Types.ObjectId(), [CN_THREAD]: threadId, [CN_USER]: userId, content });
    post.save()
        .then((post) => {
            res.status(201).json({ success: true, message: 'Successfully created post.', data: post });
        }).catch((err) => {
            res.status(500).json({ message: "Something went wrong. Cannot create post. Try again later.", err: err });
        });
};

const archivePost = (req, res) => {
    const { userId } = req.authorization;
    const { postId } = req.body;

    POST.updateOne({ _id: postId, [CN_USER]: userId }, { $set: { archived: true, dateDeleted: Date.now() } })
        .then((result) => {
            res.status(202).json({ success: true, message: `Successfully deleted post #${postId}`, data: result });
        }).catch((err) => {
            res.status(500).json({ message: 'Something went wrong. Cannot delete post. Try again later.', err: err });
        });
};

const deletePost = (req, res) => {
    const { userId } = req.authorization;
    const { postId } = req.body;

    POST.deleteOne({ _id: postId, [CN_USER]: userId })
        .then((result) => {
            res.status(202).json({ success: true, message: `Successfully deleted post #${postId}`, data: result });
        }).catch((err) => {
            res.status(500).json({ message: 'Something went wrong. Cannot delete post. Try again later.', err: err });
        });
};

module.exports = { getAllPosts, createPost, archivePost, deletePost };