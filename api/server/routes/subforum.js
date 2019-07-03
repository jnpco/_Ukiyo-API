const express = require('express');
const router = express.Router();

const { getAllSubforums, createSubforum, archiveSubforum, deleteSubforum } = require('../controller').Subforum;
const { verifyAuthentication, verifyAccessLevelPerms, accessLevelPerms } = require('../auth');
const { ADMIN } = accessLevelPerms;

// TODO: Use query instead of params for get
router.get('/:forumId', getAllSubforums);

// NEEDS AUTHENTICATION
router.post('/', verifyAuthentication, verifyAccessLevelPerms(ADMIN.name), createSubforum);
router.patch('/', verifyAuthentication, verifyAccessLevelPerms(ADMIN.name), archiveSubforum );
router.delete('/', verifyAuthentication, verifyAccessLevelPerms(ADMIN.name), deleteSubforum );

module.exports = router;