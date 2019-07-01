const express = require('express');
const router = express.Router();

const Controller = require('../controller');
const Authentication = require('../auth');

// router.get('/:postId', Controller.Post.getPost);
// TODO: Use query instead of params for get
router.get('/:threadId', Controller.Post.getAllPosts);

// NEEDS AUTHENTICATION
router.post('/', Authentication.verifyAuthentication, Controller.Post.createPost);
router.patch('/', Authentication.verifyAuthentication, Controller.Post.archivePost);
router.delete('/', Authentication.verifyAuthentication, Controller.Post.deletePost);

module.exports = router;