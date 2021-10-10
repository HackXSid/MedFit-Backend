'use strict';

const express = require('express');
const { getDiagnosis, getSymptoms } = require('../controllers/medbuddy.controller');

const router = express.Router();

router.route('/predict').post(getDiagnosis);
router.route('/symptoms').get(getSymptoms);

module.exports = { router };
