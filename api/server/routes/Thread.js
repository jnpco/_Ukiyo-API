const express = require('express');
const router = express.Router();

const Controller = require('../controller');
const Authentication = require('../auth');

// TODO: Use query instead of params for get
router.get('/', Controller.Thread.getAllThreads);
router.get('/:threadId', Controller.Thread.getThread);

// NEEDS AUTHENTICATION
router.post('/', Authentication.verifyAuthentication, Controller.Thread.createThread);
router.patch('/', Authentication.verifyAuthentication, Controller.Thread.archiveThread);
router.delete('/', Authentication.verifyAuthentication, Controller.Thread.deleteThread);

module.exports = router;