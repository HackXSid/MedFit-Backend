'use strict';

const { applyExtraSetup } = require('./association');

const sequelize = require('./database');

const modelDefiners = [
    require('./user.model'),
    require('./doctor.model'),
    require('./hospital.model'),
    require('./doctor_schedule.model'),
    require('./patient_booking.model'),
    require('./prescription.model'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}
applyExtraSetup(sequelize);

module.exports = sequelize;
