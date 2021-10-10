'use strict';

const { userLogin, userCreate } = require('../helpers/user.crud');
const { userTypes } = require('../constants/constants');
const { generateToken } = require('../constants/authConfig');
const { ValidationError } = require('sequelize');
const validator = require('validator').default;

const loginController = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        res.status(400).send({
            error: 'Email Address cannot be empty',
        });
        return;
    }
    if (!password) {
        res.status(400).send({
            error: 'Password cannot be empty',
        });
        return;
    }
    if (password.length < 6) {
        res.status(400).send({
            error: 'Minimum length for password is 6',
        });
        return;
    }
    const [validateStatus, user] = await userLogin(email, password);
    if (validateStatus) {
        const token = await generateToken(email);
        user['password'] = '';
        res.status(200).send({
            message: 'Email and Password valid',
            user,
            token,
        });
    } else {
        res.status(400).send({
            error: 'Invalid email and password combination',
        });
    }
    return;
};

const registerController = async (req, res) => {
    const {
        email,
        password,
        name,
        dob,
        phone_number,
        gender,
        address,
        emergency_phone_number,
    } = req.body;
    const userType = userTypes[0];
    if (!email) {
        res.status(400).send({
            error: 'Email Address cannot be empty',
        });
        return;
    }
    if (!validator.isEmail(email)) {
        res.status(400).send({
            error: 'Not a valid email address',
        });
        return;
    }
    if (!password) {
        res.status(400).send({
            error: 'Password cannot be empty',
        });
        return;
    }
    if (password.length < 6) {
        res.status(400).send({
            error: 'Minimum length for password is 6',
        });
        return;
    }
    if (!name || !dob || !phone_number || !gender) {
        res.status(400).send({
            error: 'Invalid details provided',
        });
    }
    try {
        await userCreate(
            email,
            password,
            name,
            dob,
            phone_number,
            gender,
            address,
            emergency_phone_number,
            userType,
        );
        res.status(201).send({ success: true, mssg: 'User registered successfully' });
    } catch (err) {
        if (err instanceof ValidationError) {
            res.status(400).send({
                success: false,
                error: 'Email address already registered',
            });
        }
    }
};

module.exports = { loginController, registerController };
