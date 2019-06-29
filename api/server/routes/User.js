const express = require('express');
const router = express.Router();

const Controller = require('../controller');

router.get('/', Controller.User.getAllUsers);
router.get('/:userId', Controller.User.getUser);
router.post('/', Controller.User.createUser);
router.delete('/:userId', Controller.User.deleteUser);

module.exports = router;