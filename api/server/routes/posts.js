const express = require('express');
const router = express.Router();

const { createPost, getPost, getAllPosts, } = require('../controller/posts');

router.get('/', getAllPosts);
router.get('/:postId', getPost);
router.post('/', createPost);

module.exports = router;