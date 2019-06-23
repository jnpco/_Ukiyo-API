const express = require('express');
const router = express.Router();

const Controller = require('../controller');

router.get('/:threadId', Controller.Post.getAllPosts);
router.post('/', Controller.Post.createPost);
router.patch('/:postId', Controller.Post.archivePost);
router.delete('/:postId', Controller.Post.deletePost);

module.exports = router;