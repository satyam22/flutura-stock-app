const express = require('express');
const router = express.Router();
const { getTimeSeriesDaily } = require('./../controllers/stocks');

router.get('/daily',getTimeSeriesDaily);

module.exports = router;