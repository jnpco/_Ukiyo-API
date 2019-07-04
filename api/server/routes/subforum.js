const express = require('express');
const router = express.Router();

const { getAllSubforums, createSubforum, archiveSubforum, deleteSubforum } = require('../controller').Subforum;
const { verifyAuthentication, verifyAccessLevelPerms, accessLevelPerms } = require('../auth');
const { ADMIN } = accessLevelPerms;

// PUBLIC ACCESS ROUTES
router.get('/', getAllSubforums);
// REQUIRES AN ACCOUNT AND ADMIN LEVEL ACCESS
router.post('/', verifyAuthentication, verifyAccessLevelPerms(ADMIN.name), createSubforum);
router.patch('/', verifyAuthentication, verifyAccessLevelPerms(ADMIN.name), archiveSubforum );
router.delete('/', verifyAuthentication, verifyAccessLevelPerms(ADMIN.name), deleteSubforum );

module.exports = router;