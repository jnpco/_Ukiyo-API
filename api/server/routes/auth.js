const express = require('express');
const router = express.Router();

const Controller = require('../controller')

router.post('/', Controller.Auth.login);
router.delete('/', Controller.Auth.logout);

module.exports = router;