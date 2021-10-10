const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');

const { logger } = require('./logger');
const { sanitiseInput } = require('./utils/sanitise');
const { router: constantRouter } = require('./routes/constant.router');
const { router: medbuddyRouter } = require('./routes/medbuddy.router');
const { router: authRouter } = require('./routes/auth.router');
const { router: nutritionixRouter } = require('./routes/nutritionix.router');
const { router: edamamRouter } = require('./routes/edamam.router');
const { router: bookingRouter } = require('./routes/booking.router');
const { router: doctorRouter } = require('./routes/doctor.router');
const { router: prescriptionRouter } = require('./routes/prescription.router');

const passport = require('./constants/passportConfig');

const app = express();

const corsOptions = {
    origin: function (_origin, callback) {
        // Allow Rest API Clients to be used for testing
        if (process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use('*', (req, _res, next) => {
    req.body = sanitiseInput(req.body);
    next();
});

app.use(cors(corsOptions));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api', passport.authenticate('jwt', { session: false }));

app.use('/auth', authRouter);
app.use('/constant', constantRouter);
app.use('/api/medbuddy', medbuddyRouter);
app.use('/api/nutritionix', nutritionixRouter);
app.use('/api/edamam', edamamRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/prescription', prescriptionRouter);

/* eslint-disable no-unused-vars */
app.use(function (err, _req, res, _next) {
    logger.error(err);
    res.status(500).send({ error: 'Oops: Something broke!' });
});
/* eslint-enable no-unused-vars */

module.exports = {
    app,
};
