const express = require('express');
const router = express.Router();

const { getAllPosts, createPost, archivePost, deletePost } = require('../controller').Post;
const { verifyAuthentication } = require('../auth');

router.get('/', getAllPosts);
// NEEDS AUTHENTICATION
router.post('/', verifyAuthentication, createPost);
router.patch('/', verifyAuthentication, archivePost);
router.delete('/', verifyAuthentication, deletePost);

module.exports = router;