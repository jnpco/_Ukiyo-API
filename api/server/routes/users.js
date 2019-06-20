const express = require('express');
const router = express.Router();

const { registerUser, getUser, deleteUser } = require('../controller/users');

router.get('/:userId', getUser);
router.post('/', registerUser);
router.delete('/:userId', deleteUser);

module.exports = router;