'use strict';

const dotenvfile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
require('dotenv').config({ path: dotenvfile });

const NUTRITIONIX_API_KEY = process.env.NUTRITIONIX_API_KEY;
const NUTRITIONIX_APP_ID = process.env.NUTRITIONIX_APP_ID;

const EDAMAM_FOOD_APP_ID = process.env.EDAMAM_FOOD_APP_ID;
const EDAMAM_FOOD_API_KEY = process.env.EDAMAM_FOOD_API_KEY;

const API_MEDIC_USERNAME = process.env.API_MEDIC_USERNAME;
const API_MEDIC_PASSWORD = process.env.API_MEDIC_PASSWORD;

const API_MEDIC_LOGIN_ENDPOINT = process.env.API_MEDIC_LOGIN_ENDPOINT;
const API_MEDIC_HEALTH_ENDPOINT = process.env.API_MEDIC_HEALTH_ENDPOINT;

module.exports = {
    NUTRITIONIX_API_KEY,
    NUTRITIONIX_APP_ID,
    EDAMAM_FOOD_APP_ID,
    EDAMAM_FOOD_API_KEY,
    API_MEDIC_USERNAME,
    API_MEDIC_PASSWORD,
    API_MEDIC_LOGIN_ENDPOINT,
    API_MEDIC_HEALTH_ENDPOINT,
};
