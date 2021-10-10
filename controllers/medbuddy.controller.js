const {
    API_MEDIC_PASSWORD,
    API_MEDIC_USERNAME,
    API_MEDIC_HEALTH_ENDPOINT,
    API_MEDIC_LOGIN_ENDPOINT,
} = require('../constants/api');
const CryptoJS = require('crypto-js');
const { default: axios } = require('axios');

const getAuthToken = async () => {
    const uri = API_MEDIC_LOGIN_ENDPOINT + '/login';
    const secret_key = API_MEDIC_PASSWORD;
    const computedHash = CryptoJS.HmacMD5(uri, secret_key);
    const computedHashString = computedHash.toString(CryptoJS.enc.Base64);
    const response = await axios.post(
        API_MEDIC_LOGIN_ENDPOINT + '/login',
        {},
        {
            headers: {
                Authorization: `Bearer ${API_MEDIC_USERNAME}:${computedHashString}`,
            },
        },
    );
    const { data } = response;
    const { Token } = data;
    return Token;
};

const getSymptoms = async (_req, res) => {
    const token = await getAuthToken();
    const response = await axios.get(API_MEDIC_HEALTH_ENDPOINT + '/symptoms', {
        params: {
            token: token,
            language: 'en-gb',
        },
    });
    const { data } = response;
    res.send({ data });
};

const getDiagnosis = async (req, res) => {
    const token = await getAuthToken();
    const { symptoms } = req.body;
    const { gender, dob } = req.user;
    const year_of_birth = new Date(dob).getFullYear();
    const response = await axios.get(API_MEDIC_HEALTH_ENDPOINT + '/diagnosis', {
        params: {
            token: token,
            language: 'en-gb',
            symptoms: JSON.stringify(symptoms),
            gender: gender.toLowerCase(),
            year_of_birth,
        },
    });
    const { data } = response;
    res.send({ data });
};

module.exports = { getSymptoms, getDiagnosis };
