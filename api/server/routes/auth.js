const express = require('express');
const router = express.Router();

const { createAuthToken } = require('../controller').Auth;

router.post('/', createAuthToken);

module.exports = router;