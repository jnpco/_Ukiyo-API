const express = require('express');
const router = express.Router();

// PUBLIC ACCESS ROUTES
router.use((req, res) => { res.status(404).json({ err: 'Not found' }); });

module.exports = router;