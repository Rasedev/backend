const express = require('express');
const paymentController = require('../../controller/paymentController');
const router = express.Router();


router.post('/sslcommerz', paymentController)

module.exports = router;   