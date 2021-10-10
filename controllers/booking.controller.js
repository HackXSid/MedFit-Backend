const { doctorFilter, doctorGet } = require('../helpers/doctor.crud');
const {
    scheduleGetByDoctor,
    scheduleGetByDoctorAndDay,
    scheduleGet,
} = require('../helpers/doctor_schedule.crud');
const {
    bookingGetBySchedule,
    bookingCreate,
    bookingGetAll,
    bookingGet,
} = require('../helpers/patient_booking.crud');

const getDoctors = async (req, res) => {
    const doctorType = req.query.doctorType;
    const doctors = await doctorFilter(doctorType);
    res.send({ doctors: doctors });
};

const getSchedules = async (req, res) => {
    const { doctorID } = req.query;
    const schedules = await scheduleGetByDoctor(doctorID);
    res.send({ schedules: schedules });
};

const getSlots = async (req, res) => {
    const { doctorID, day_of_week } = req.query;
    const response = await scheduleGetByDoctorAndDay(doctorID, day_of_week);
    const schedules = await Promise.all(
        response.map(async (schedule) => {
            const scheduleID = schedule.id;
            const bookings = await bookingGetBySchedule(scheduleID);
            return { ...schedule, booked_slots: bookings.length };
        }),
    );
    res.send({ schedules });
};

const getSlotSpecific = async (req, res) => {
    const { scheduleID } = req.query;
    const response = await scheduleGet(scheduleID);
    response['bookings'] = (await bookingGetBySchedule(scheduleID)).length;
    response['doctor'] = await doctorGet(response.doctorId);
    res.send({ schedule: response });
};

const confirmBooking = async (req, res) => {
    const { date, doctorScheduleId } = req.body;
    const { email } = req.user;
    const schedule = await scheduleGet(doctorScheduleId);
    if (
        (schedule.number_of_patients - (await bookingGetBySchedule(doctorScheduleId)))
            .length <= 0
    ) {
        res.status(400).send({ message: 'Slot is full' });
        return;
    }
    await bookingCreate(new Date(date), 'Active', '', doctorScheduleId, email);
    res.send({ success: true });
};

const getBookings = async (req, res) => {
    const { email } = req.user;
    const response = await bookingGetAll(email);
    const bookings = await Promise.all(
        response.map(async (booking) => {
            const schedule = await scheduleGet(booking.doctorScheduleId);
            const doctor = await doctorGet(schedule.doctorId);
            return { ...booking, schedule, doctor };
        }),
    );
    res.send({ bookings });
};

const getBooking = async (req, res) => {
    const { id } = req.query;
    const booking = await bookingGet(id);
    const schedule = await scheduleGet(booking.doctorScheduleId);
    const doctor = await doctorGet(schedule.doctorId);
    res.send({ booking, schedule, doctor });
};

module.exports = {
    getDoctors,
    getSchedules,
    getSlots,
    getSlotSpecific,
    confirmBooking,
    getBookings,
    getBooking,
};
