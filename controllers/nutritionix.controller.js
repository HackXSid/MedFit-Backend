'use strict';
const axios = require('axios');
const { NUTRITIONIX_API_KEY, NUTRITIONIX_APP_ID } = require('../constants/api');
const { getAge } = require('../utils');

const axiosInstance = axios.default.create({
    baseURL: 'https://trackapi.nutritionix.com',
});

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.defaults.headers.post['x-app-id'] = NUTRITIONIX_APP_ID;
axiosInstance.defaults.headers.post['x-app-key'] = NUTRITIONIX_API_KEY;
axiosInstance.defaults.headers.post['x-remote-user-id'] = 0;

const endpoint = {
    NLP_NUTRITION_ENDPOINT: 'v2/natural/nutrients',
    NLP_EXERCISE_ENDPOINT: 'v2/natural/exercise',
};

const nutritionalInfo = async (req, res) => {
    const message = req.body.text;
    const timezone = 'Asia/Kolkata';

    const response = await axiosInstance.post(endpoint.NLP_NUTRITION_ENDPOINT, {
        query: message,
        timezone: timezone,
    });
    const { data } = response;
    res.send(data);
};

const exerciseInfo = async (req, res) => {
    const { query, weight_kg, height_cm } = req.body;
    const { gender, dob } = req.user;
    const age = getAge(new Date(dob));
    const response = await axiosInstance.post(endpoint.NLP_EXERCISE_ENDPOINT, {
        query,
        gender: gender.toLowerCase(),
        weight_kg,
        height_cm,
        age: Math.max(1, age), // Hack
    });
    const { data } = response;
    res.send(data);
};

module.exports = { nutritionalInfo, exerciseInfo };
