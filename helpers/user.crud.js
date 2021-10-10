'use strict';

const sequelize = require('../models/');
const { hash } = require('../utils/encryptDecrypt');

const { user } = sequelize.models;

const userCreate = async (
    email,
    password,
    name,
    dob,
    phone_number,
    gender,
    address,
    emergency_phone_number,
    userType,
) => {
    await user.create({
        email,
        password,
        name,
        dob,
        phone_number,
        gender,
        address,
        emergency_phone_number,
        userType,
    });
};

const userGet = async (email) => {
    return await user.findByPk(email, { raw: true });
};

const userLogin = async (email, password) => {
    const User = await userGet(email);
    if (!User) return [false, null];
    const hashedPassword = hash(password);
    return [User.password === hashedPassword, User];
};

module.exports = { userCreate, userGet, userLogin };
