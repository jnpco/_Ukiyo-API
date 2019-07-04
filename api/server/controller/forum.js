const mongoose = require('mongoose');

// MODEL IMPORT
const { FORUM } = require('../models/forum');
// COLLECTION NAMES
const { CN_USER } = require('../models/user');

const getAllForums = (req, res) => {
    FORUM.find({ archived: false })
        .populate('user')
        .then(forums => {
            res.status(200).json({
                success: true,
                message: `${forums.length ? `${forums.length} forums fetched from database.` : 'No forums available.'}`,
                data: forums
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong. Cannot fetch forums. Try again later.',
                err
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
    forum
        .save()
        .then(forumData => {
            res.status(201).json({
                success: true,
                message: 'Successfully created forum.',
                data: forumData
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong. Cannot create forum. Try again later.',
                err
            });
        });
};

const archiveForum = (req, res) => {
    const { userId } = req.authorization;
    const { forumId } = req.body;

    FORUM.updateOne({ _id: forumId, [CN_USER]: userId }, { $set: { archived: true, dateDeleted: Date.now() } })
        .then(result => {
            res.status(202).json({
                success: true,
                message: `Successfully deleted forum #${forumId}`,
                data: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong. Cannot delete forum. Try again later.',
                err
            });
        });
};

const deleteForum = (req, res) => {
    const { userId } = req.authorization;
    const { forumId } = req.body;

    FORUM.deleteOne({ _id: forumId, [CN_USER]: userId })
        .then(result => {
            res.status(202).json({
                success: true,
                message: `Successfully deleted forum #${forumId}`,
                data: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong. Cannot delete forum. Try again later.',
                err
            });
        });
};

module.exports = { getAllForums, createForum, archiveForum, deleteForum };
