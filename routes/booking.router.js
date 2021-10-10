'use strict';

const express = require('express');
const {
    getDoctors,
    getSchedules,
    getSlots,
    getSlotSpecific,
    confirmBooking,
    getBookings,
    getBooking,
} = require('../controllers/booking.controller');

const router = express.Router();

router.route('/getDoctors').get(getDoctors);
router.route('/getSchedules').get(getSchedules);
router.route('/getSlots').get(getSlots);
router.route('/getSlot').get(getSlotSpecific);
router.route('/confirm').post(confirmBooking);
router.route('/myBookings').get(getBookings);
router.route('/myBooking').get(getBooking);

module.exports = { router };
