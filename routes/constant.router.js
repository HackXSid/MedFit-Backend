'use strict';

const express = require('express');
const { typeOfDoctors } = require('../constants/constants');
const { hospitalGetAll, hospitalGet } = require('../helpers/hospital.crud');

const router = express.Router();

router.route('/specialities').get((_req, res) => {
    res.send({ specialities: typeOfDoctors });
});

router.route('/hospitals').get(async (_req, res) => {
    const response = await hospitalGetAll();
    res.send({ hospitals: response });
});

router.route('/hospitals/specific').get(async (req, res) => {
    const name = req.query.name;
    const response = await hospitalGet(name);
    res.send({ hospital: response });
});

module.exports = { router };
