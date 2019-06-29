const express = require('express');
const router = express.Router();

const Controller = require('../controller')

router.post('/', Controller.Session.login);
router.delete('/', Controller.Session.logout);

module.exports = router;