const mongoose = require('mongoose');

// MODEL IMPORT
const { SUBFORUM } = require('../models/subforum');
// COLLECTION NAMES
const { CN_USER } = require('../models/user');
const { CN_FORUM } = require('../models/forum')

const getAllSubforums = (req, res) => {
    const { forum } = req.query;
    SUBFORUM.find({ [CN_FORUM]: forum, archived: false })
        .populate([CN_USER])
        .then((subforums) => {
            res.status(200).json({
                success: true,
                data: subforums
            });
        }).catch((err) => {
            res.status(404).json({
                message: "No subforums here.",
                err: err
            });
        });
};

const createSubforum = (req, res) => {
    const { userId } = req.authorization;
    const { subject, forumId } = req.body;
    const subforum = new SUBFORUM({
        _id: new mongoose.Types.ObjectId(),
        [CN_USER]: userId,
        [CN_FORUM]: forumId,
        subject
    });

    subforum.save()
        .then((subforum) => {
            res.status(201).json({
                success: true,
                data: subforum
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Could not create subforum.",
                err: err
            });
        });
};

const archiveSubforum = (req, res) => {
    const { userId } = req.authorization;
    const { subforumId } = req.body;
    SUBFORUM.updateOne({ _id: subforumId, [CN_USER]: userId }, { $set: { "archived": true, "dateDeleted": Date.now() } })
        .then((result) => {
            res.status(202).json({
                success: true,
                data: result
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Could not delete subforum.",
                err: err
            });
        });
};

const deleteSubforum = (req, res) => {
    const { userId } = req.authorization;
    const { subforumId } = req.body;
    SUBFORUM.deleteOne({ _id: subforumId, [CN_USER]: userId })
        .then((result) => {
            res.status(202).json({
                success: true,
                data: result
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Subforum could not be permanently deleted.",
                err: err
            });
        });
};

module.exports = {
    getAllSubforums,
    createSubforum,
    archiveSubforum,
    deleteSubforum
};