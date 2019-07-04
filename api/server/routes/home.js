const express = require('express');
const router = express.Router();

const { getHome } = require('../controller').Home;

// PUBLIC ACCESS ROUTES
router.get('/', getHome);

module.exports = router;