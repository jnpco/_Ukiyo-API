const express = require('express');
const router = express.Router();

const Controller = require('../controller')

router.get('/', Controller.Thread.getAllThreads);
router.get('/:threadId', Controller.Thread.getThread);
router.post('/', Controller.Thread.createThread);

module.exports = router;