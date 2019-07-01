const express = require('express');
const router = express.Router();
const verifyAuth = require('../authentication/verifyAuth');

const Controller = require('../controller');

// router.get('/:postId', Controller.Post.getPost);
// TODO: Use query instead of params for get
router.get('/:threadId', Controller.Post.getAllPosts);

// NEEDS AUTHENTICATION
router.post('/', verifyAuth, Controller.Post.createPost);
router.patch('/', verifyAuth, Controller.Post.archivePost);
router.delete('/', verifyAuth, Controller.Post.deletePost);

module.exports = router;