'use strict';
const axios = require('axios');
const qs = require('qs');

const { EDAMAM_FOOD_API_KEY, EDAMAM_FOOD_APP_ID } = require('../constants/api');

const axiosInstance = axios.default.create({
    baseURL: 'https://api.edamam.com',
});
const endpoint = {
    RECIPE_SEARCH: 'api/recipes/v2',
};

const recipeSearch = async (req, res) => {
    const { query, health, diet, calories } = req.body;
    const response = await axiosInstance.get(endpoint.RECIPE_SEARCH, {
        params: {
            app_id: EDAMAM_FOOD_APP_ID,
            app_key: EDAMAM_FOOD_API_KEY,
            q: query,
            type: 'public',
            health,
            diet,
            calories: `0-${calories / 10}`,
        },
        paramsSerializer: (params) => {
            return qs.stringify(params);
        },
    });
    const { data } = response;
    res.send(data);
};

module.exports = { recipeSearch };
