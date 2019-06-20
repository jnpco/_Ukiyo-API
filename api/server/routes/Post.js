const express = require('express');
const router = express.Router();

const Controller = require('../controller');

router.get('/', Controller.Post.getAllPosts);
router.get('/:postId', Controller.Post.getPost);
router.post('/', Controller.Post.createPost);

module.exports = router;