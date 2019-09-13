const express = require('express');
const router = express.Router();
const graphic = require('./routes/graphic');

router.use('/',graphic)

module.exports = router;