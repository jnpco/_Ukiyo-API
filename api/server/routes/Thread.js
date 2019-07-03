const express = require('express');
const router = express.Router();

const { getAllThreads, createThread, archiveThread, deleteThread } = require('../controller').Thread;
const { verifyAuthentication } = require('../auth');

router.get('/', getAllThreads);
// NEEDS AUTHENTICATION
router.post('/', verifyAuthentication, createThread);
router.patch('/', verifyAuthentication, archiveThread);
router.delete('/', verifyAuthentication, deleteThread);

module.exports = router;