const express = require('express');
const router = express.Router();

const { getAllThreads, createThread, archiveThread, deleteThread } = require('../controller').Thread;
const { verifyAuthentication } = require('../auth');

// PUBLIC ACCESS ROUTES
router.get('/', getAllThreads);
// REQUIRES AN ACCOUNT
router.post('/', verifyAuthentication, createThread);
router.patch('/', verifyAuthentication, archiveThread);
router.delete('/', verifyAuthentication, deleteThread);

module.exports = router;