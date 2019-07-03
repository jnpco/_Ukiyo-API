const express = require('express');
const router = express.Router();

const { getAllPosts, createPost, archivePost, deletePost } = require('../controller').Post;
const { verifyAuthentication } = require('../auth');

// TODO: Use query instead of params for get
router.get('/:threadId', getAllPosts);

// NEEDS AUTHENTICATION
router.post('/', verifyAuthentication, createPost);
router.patch('/', verifyAuthentication, archivePost);
router.delete('/', verifyAuthentication, deletePost);

module.exports = router;