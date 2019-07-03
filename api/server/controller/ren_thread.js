const mongoose = require('mongoose');

// MODEL IMPORT
const { THREAD } = require('../models/thread');
// COLLECTION NAMES
const { CN_USER } = require('../models/user');
const { CN_SUBFORUM } = require('../models/subforum');

const getAllThreads = (req, res) => {
    const { subforum } = req.query;
    THREAD.find({ [CN_SUBFORUM]: subforum, archived: false })
        .populate([CN_USER])
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
    const { userId } = req.authorization;
    const { subforumId, subject } = req.body;
    const thread = new THREAD({
        _id: new mongoose.Types.ObjectId(),
        [CN_SUBFORUM]: subforumId,
        [CN_USER]: userId,
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

const archiveThread = (req, res) => {
    const { userId } = req.authorization;
    const { threadId } = req.body;
    THREAD.updateOne({ _id: threadId, [CN_USER]: userId }, { $set: { "archived": true, "dateDeleted": Date.now() } })
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
};

const deleteThread = (req, res) => {
    const { userId } = req.authorization;
    const { threadId } = req.body;
    THREAD.deleteOne({ _id: threadId, [CN_USER]: userId })
        .then((result) => {
            res.status(202).json({
                success: true,
                data: result
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Thread could not be permanently deleted.",
                err: err
            });
        });
};

module.exports = {
    getAllThreads,
    createThread,
    archiveThread,
    deleteThread
};