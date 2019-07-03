const express = require('express');
const router = express.Router();

const { getAllThreads, createThread, archiveThread, deleteThread } = require('../controller').Thread;
const { verifyAuthentication } = require('../auth');

// TODO: Use query instead of params for get
router.get('/:subforumId', getAllThreads);

// NEEDS AUTHENTICATION
router.post('/', verifyAuthentication, createThread);
router.patch('/', verifyAuthentication, archiveThread);
router.delete('/', verifyAuthentication, deleteThread);

module.exports = router;