const { doctorByEmail, doctorGet } = require('../helpers/doctor.crud');
const {
    scheduleGetByDoctor,
    scheduleCreate,
    scheduleDelete,
} = require('../helpers/doctor_schedule.crud');
const { userGet } = require('../helpers/user.crud');
const { bookingGetBySchedule } = require('../helpers/patient_booking.crud');
const { prescriptionGetAllUser } = require('../helpers/prescription.crud');

const getSchedules = async (req, res) => {
    const doctor = await doctorByEmail(req.user.email);
    const schedules = await scheduleGetByDoctor(doctor.id);
    res.send({ schedules });
};

const getPrescriptions = async (req, res) => {
    const { userEmail } = req.query;
    const prescriptions = await prescriptionGetAllUser(userEmail);
    const prescriptionsWithDoctor = await Promise.all(
        prescriptions.map(async (prescription) => {
            const doctor = await doctorGet(prescription.doctorId);
            const user = await userGet(prescription.userEmail);
            return { prescription, doctor, user };
        }),
    );
    res.send({ prescriptions: prescriptionsWithDoctor });
};

const getAppointments = async (req, res) => {
    const doctor = await doctorByEmail(req.user.email);
    const schedules = await scheduleGetByDoctor(doctor.id);
    const bookingList = [];
    await Promise.all(
        schedules.map(async (schedule) => {
            const bookings = await bookingGetBySchedule(schedule.id);
            bookings.map((booking) => {
                bookingList.push({ ...booking, schedule, doctor });
            });
        }),
    );
    const bookings = [];
    await Promise.all(
        bookingList.map(async (obj) => {
            const user = await userGet(obj.userEmail);
            bookings.push({ ...obj, user });
        }),
    );
    res.send({ bookings });
};

const createSchedule = async (req, res) => {
    const doctor = await doctorByEmail(req.user.email);
    const {
        day_of_week,
        start_time,
        end_time,
        isVirtual,
        address,
        number_of_patients,
    } = req.body;
    await scheduleCreate(
        day_of_week,
        start_time,
        end_time,
        isVirtual,
        address,
        number_of_patients,
        doctor.id,
    );
    res.send({ success: true });
};

const deleteSchedule = async (req, res) => {
    const { id } = req.body;
    await scheduleDelete(id); // @TODO : Check whether doctor created that schedule
    res.send({ success: true });
};

module.exports = {
    getSchedules,
    getAppointments,
    createSchedule,
    deleteSchedule,
    getPrescriptions,
};
