const express = require('express');

const router = express.Router();

const { createAuthToken } = require('../controller').Auth;

// PUBLIC ACCESS ROUTES
router.post('/', createAuthToken);

module.exports = router;
