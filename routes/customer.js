const express = require('express');
const { getBooking, bookingHostel } = require('../controllers/customerController');
const { verifyToken, isCustomer } = require('../middlewares/auth');

const router = express.Router();

router.get('/hostels', verifyToken, isCustomer, getBooking); 
router.post('/book', verifyToken, isCustomer, bookingHostel);

module.exports = router;
