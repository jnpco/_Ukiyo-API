const express = require('express');
const router = express.Router();

const { getAllSubforums, createSubforum, archiveSubforum, deleteSubforum } = require('../controller').Subforum;
const { verifyAuthentication } = require('../auth');

// TODO: Use query instead of params for get
router.get('/:forumId', getAllSubforums);

// NEEDS AUTHENTICATION
router.post('/', verifyAuthentication, createSubforum);
router.patch('/', verifyAuthentication, archiveSubforum );
router.delete('/', verifyAuthentication, deleteSubforum );

module.exports = router;