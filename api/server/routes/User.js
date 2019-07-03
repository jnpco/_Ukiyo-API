const express = require('express');
const router = express.Router();

const { getAllUsers, getUser, getUserbyName, createUser, deleteUser } = require('../controller').User;

router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.get('/:username', getUserbyName);
router.post('/', createUser);
router.delete('/:userId', deleteUser);

module.exports = router;