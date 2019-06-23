const mongoose = require('mongoose');

// MODEL IMPORT
const { THREAD_MODEL } = require('../models/Thread');
// COLLECTION NAMES
const { USER_LABEL } = require('../models/User');

// SHOW ONLY UNARCHIVED THREAD
const getThread = (req, res) => {
    const threadId = req.params.postId;
    THREAD_MODEL.findById(threadId)
        .then((thread) => {
            res.status(200).json({
                success: true,
                data: thread
            });
        }).catch((err) => {
            res.status(404).json({
                message: "Thread not found.",
                err: err
            });
        });
};

// SHOW ONLY UNARCHIVED THREADS
const getAllThreads = (req, res) => {
    THREAD_MODEL.find({})
        .populate(USER_LABEL)
        .then((threads) => {
            res.status(200).json({
                success: true,
                data: threads
            });
        }).catch((err) => {
            res.status(404).json({
                message: "No threads here.",
                err: err
            });
        });
};

const createThread = (req, res) => {
    const { user, subject } = req.body;
    const thread = new THREAD_MODEL({
        _id: new mongoose.Types.ObjectId(),
        [USER_LABEL]: user,
        subject
    });

    thread.save()
        .then((thread) => {
            res.status(201).json({
                success: true,
                data: thread
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Could not create thread",
                err: err
            });
        });
};

const deleteThread = (req, res) => {
    const threadId = req.params.threadId;

    THREAD_MODEL.deleteOne({ _id: threadId })
        .then((result) => {
            res.status(202).json({
                success: true,
                data: result
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Could not delete thread.",
                err: err
            });
        });

    // ARCHIVE INSTEAD OF DELETE
    // CALL DELETE FN (ARCHIVE) POSTS IN THREAD
    // ADD IN FIELD DELETED DATE ON ARCHIVE
}


module.exports = {
    getThread,
    getAllThreads,
    createThread,
    deleteThread
};