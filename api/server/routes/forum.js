const express = require('express');
const router = express.Router();

const { getAllForums, createForum, archiveForum, deleteForum } = require('../controller').Forum;
const { verifyAuthentication} = require('../auth');

router.get('/', getAllForums);

// NEEDS AUTHENTICATION
router.post('/', verifyAuthentication, createForum);
router.patch('/', verifyAuthentication, archiveForum);
router.delete('/', verifyAuthentication, deleteForum);

module.exports = router;