'use strict';

const express = require('express');
const { recipeSearch } = require('../controllers/edamam.controller');

const router = express.Router();

router.route('/recipe').post(recipeSearch);

module.exports = { router };
