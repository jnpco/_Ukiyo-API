const mongoose = require('mongoose');

// MODEL IMPORT
const { FORUM } = require('../models/forum');
// COLLECTION NAMES
const { CN_USER } = require('../models/user');
// ARCHIVE ALL POSTS INSIDE FORUM
const { archiveAllSubforums, deleteAllSubforums } = require('./subforum');

const getAllForums = (req, res) => {
    FORUM.find({ archived: false })
        .populate('user')
        .then((forums) => {
            res.status(200).json({
                success: true,
                data: forums
            });
        }).catch((err) => {
            res.status(404).json({
                message: "No forums here.",
                err: err
            });
        });
};

const createForum = (req, res) => {
    const { userId } = req.authorization;
    const { subject } = req.body;
    const forum = new FORUM({
        _id: new mongoose.Types.ObjectId(),
        [CN_USER]: userId,
        subject
    });

    forum.save()
        .then((forum) => {
            res.status(201).json({
                success: true,
                data: forum
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Could not create thread",
                err: err
            });
        });
};

const archiveForum = (req, res) => {
    const { userId } = req.authorization;
    const { forumId } = req.body;
    FORUM.updateOne({ _id: forumId, [CN_USER]: userId }, { $set: { "archived": true, "dateDeleted": Date.now() } })
        .then((result) => {
            res.status(202).json({
                success: true,
                data: result
            });
            archiveAllSubforums(forumId);
        }).catch((err) => {
            res.status(500).json({
                message: "Could not delete forum.",
                err: err
            });
        });
};

const deleteForum = (req, res) => {
    const { userId } = req.authorization;
    const { forumId } = req.body;
    FORUM.deleteOne({ _id: forumId, [CN_USER]: userId })
        .then((result) => {
            res.status(202).json({
                success: true,
                data: result
            });
            deleteAllSubforums(forumId);
        }).catch((err) => {
            res.status(500).json({
                message: "Thread could not be permanently deleted.",
                err: err
            });
        });
};

module.exports = {
    getAllForums,
    createForum,
    archiveForum,
    deleteForum
};