const express = require('express');
const router = express.Router();
const { getTimeSeriesDaily,getTimeSeriesIntraday } = require('./../controllers/stocks');

router.get('/daily',getTimeSeriesDaily);
router.get('/intraday', getTimeSeriesIntraday);
module.exports = router;