const express = require('express');
const router = express.Router();
const verifyAuth = require('../authentication/verifyAuth');

const Controller = require('../controller')

// TODO: Use query instead of params for get
router.get('/', Controller.Thread.getAllThreads);
router.get('/:threadId', Controller.Thread.getThread);

// NEEDS AUTHENTICATION
router.post('/', verifyAuth, Controller.Thread.createThread);
router.patch('/', verifyAuth, Controller.Thread.archiveThread);
router.delete('/', verifyAuth, Controller.Thread.deleteThread);

module.exports = router;