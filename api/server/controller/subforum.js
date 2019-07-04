const mongoose = require('mongoose');

// MODEL IMPORT
const { SUBFORUM } = require('../models/subforum');
// COLLECTION NAMES
const { CN_USER } = require('../models/user');
const { CN_FORUM } = require('../models/forum');

const getAllSubforums = (req, res) => {
    const { forum } = req.query;

    SUBFORUM.find({ [CN_FORUM]: forum, archived: false })
        .populate([CN_USER])
        .then(subforums => {
            res.status(200).json({
                success: true,
                message: `${
                    subforums.length
                        ? `${subforums.length} subforums fetched from database.`
                        : 'No subforums available.'
                }`,
                data: subforums
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong. Cannot fetch subforums. Try again later.',
                err
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
    subforum
        .save()
        .then(subforumData => {
            res.status(201).json({
                success: true,
                message: 'Successfully created subforum.',
                data: subforumData
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong. Cannot create subforum. Try again later.',
                err
            });
        });
};

const archiveSubforum = (req, res) => {
    const { userId } = req.authorization;
    const { subforumId } = req.body;

    SUBFORUM.updateOne({ _id: subforumId, [CN_USER]: userId }, { $set: { archived: true, dateDeleted: Date.now() } })
        .then(result => {
            res.status(202).json({
                success: true,
                message: `Successfully deleted subforum #${subforumId}`,
                data: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong. Cannot delete subforum. Try again later.',
                err
            });
        });
};

const deleteSubforum = (req, res) => {
    const { userId } = req.authorization;
    const { subforumId } = req.body;

    SUBFORUM.deleteOne({ _id: subforumId, [CN_USER]: userId })
        .then(result => {
            res.status(202).json({
                success: true,
                message: `Successfully deleted subforum #${subforumId}`,
                data: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong. Cannot delete subforum. Try again later.',
                err
            });
        });
};

module.exports = {
    getAllSubforums,
    createSubforum,
    archiveSubforum,
    deleteSubforum
};
