const express = require('express');
const router = express.Router();

const { getHome } = require('../controller').Home;
router.get('/', getHome);

module.exports = router;