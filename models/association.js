'use strict';

const applyExtraSetup = (sequelize) => {
    const { user, doctor, hospital, doctor_schedule, patient_booking, prescription } =
        sequelize.models;

    doctor.belongsTo(user, { constraints: false });
    user.hasOne(doctor, { constraints: false });

    doctor.belongsTo(hospital, { as: 'hospital', constraints: false });
    hospital.hasMany(doctor, {
        as: 'hospital',
        constraints: false,
        onDelete: 'cascade',
    });

    doctor.hasMany(doctor_schedule);
    doctor_schedule.hasOne(doctor, { constraints: false });

    doctor_schedule.hasMany(patient_booking, { onDelete: 'cascade' });
    patient_booking.hasOne(doctor_schedule, { constraints: false });

    user.hasMany(patient_booking);
    patient_booking.belongsTo(user, { constraints: false });

    doctor.hasMany(prescription);
    prescription.belongsTo(doctor, { constraints: false });

    user.hasMany(prescription);
    prescription.belongsTo(user, { constraints: false });
};

module.exports = { applyExtraSetup };
