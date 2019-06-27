const express = require('express');
const router = express.Router();

const Controller = require('../controller')

// TODO: Use query instead of params for get
router.get('/', Controller.Thread.getAllThreads);
router.get('/:threadId', Controller.Thread.getThread);
router.post('/', Controller.Thread.createThread);
router.patch('/', Controller.Thread.archiveThread);
router.delete('/', Controller.Thread.deleteThread);

module.exports = router;