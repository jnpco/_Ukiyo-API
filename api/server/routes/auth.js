const express = require('express');
const router = express.Router();

const Controller = require('../controller')

router.post('/', Controller.Auth.createAuthToken);

module.exports = router;