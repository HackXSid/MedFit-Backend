'use strict';

const express = require('express');
const {
    nutritionalInfo,
    exerciseInfo,
} = require('../controllers/nutritionix.controller');

const router = express.Router();

router.route('/foodnlp').post(nutritionalInfo);
router.route('/exercisenlp').post(exerciseInfo);

module.exports = { router };
