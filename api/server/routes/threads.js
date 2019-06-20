const express = require('express');
const router = express.Router();

const { getThread, getAllThreads, createThread } = require('../controller/threads');

router.get('/', getAllThreads);
router.get('/:threadId', getThread);
router.post('/', createThread);

module.exports = router;