const express = require('express');
const router = express.Router();

const { getUser, getAllUsers, registerUser, deleteUser } = require('../controller/users');

router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.post('/', registerUser);
router.delete('/:userId', deleteUser);

module.exports = router;