const express = require('express');
const router = express.Router();

const { getAllPosts, createPost, archivePost, deletePost } = require('../controller').Post;
const { verifyAuthentication } = require('../auth');

// PUBLIC ACCESS ROUTES
router.get('/', getAllPosts);
// REQUIRES AN ACCOUNT
router.post('/', verifyAuthentication, createPost);
router.patch('/', verifyAuthentication, archivePost);
router.delete('/', verifyAuthentication, deletePost);

module.exports = router;