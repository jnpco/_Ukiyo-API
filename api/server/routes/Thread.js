const express = require('express');
const router = express.Router();

const Controller = require('../controller')

router.get('/', Controller.Thread.getAllThreads);
router.get('/:threadId', Controller.Thread.getThread);
router.post('/', Controller.Thread.createThread);
router.patch('/:threadId', Controller.Thread.archiveThread);
router.delete('/:threadId', Controller.Thread.deleteThread);

module.exports = router;