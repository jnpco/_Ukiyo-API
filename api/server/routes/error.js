const express = require('express');
const router = express.Router();

router.use((req, res) => {
    res.status(400).json({ error: "ERROR" });
});

module.exports = router;