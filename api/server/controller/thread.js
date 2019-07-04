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
        .then(threads => {
            res.status(200).json({
                success: true,
                message: `${
                    threads.length ? `${threads.length} threads fetched from database.` : 'No threads available.'
                }`,
                data: threads
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong. Cannot fetch threads. Try again later.',
                err
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
    thread
        .save()
        .then(threadData => {
            res.status(201).json({
                success: true,
                message: 'Successfully created thread.',
                data: threadData
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong. Cannot create thread. Try again later.',
                err
            });
        });
};

const archiveThread = (req, res) => {
    const { userId } = req.authorization;
    const { threadId } = req.body;
    THREAD.updateOne({ _id: threadId, [CN_USER]: userId }, { $set: { archived: true, dateDeleted: Date.now() } })
        .then(result => {
            res.status(202).json({
                success: true,
                message: `Successfully deleted thread #${threadId}`,
                data: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong. Cannot delete thread. Try again later.',
                err
            });
        });
};

const deleteThread = (req, res) => {
    const { userId } = req.authorization;
    const { threadId } = req.body;
    THREAD.deleteOne({ _id: threadId, [CN_USER]: userId })
        .then(result => {
            res.status(202).json({
                success: true,
                message: `Successfully deleted thread #${threadId}`,
                data: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong. Cannot delete thread. Try again later.',
                err
            });
        });
};

module.exports = { getAllThreads, createThread, archiveThread, deleteThread };
