const {
    prescriptionCreate,
    prescriptionGet,
    prescriptionGetAllDoctor,
    prescriptionGetAllUser,
} = require('../helpers/prescription.crud');
const { doctorByEmail, doctorGet } = require('../helpers/doctor.crud');
const { userGet } = require('../helpers/user.crud');

const createPrescription = async (req, res) => {
    const doctor = await doctorByEmail(req.user.email);
    const { diagnosis, tests, medicine, expiry, others, patientEmail } = req.body;
    await prescriptionCreate(
        diagnosis,
        tests,
        medicine,
        expiry,
        others,
        doctor.id,
        patientEmail,
    );
    res.send({ success: true });
};

const getPrescription = async (req, res) => {
    const { id } = req.query;
    const prescription = await prescriptionGet(id);
    if (!prescription) {
        res.send(null);
        return;
    }
    const doctor = await doctorGet(prescription.doctorId);
    const user = await userGet(prescription.userEmail);
    res.send({ prescription, doctor, user });
};

const getPrescriptionByDoctor = async (req, res) => {
    const doctor = await doctorByEmail(req.user.email);
    const prescriptions = await prescriptionGetAllDoctor(doctor.id);
    const prescriptionsWithDoctor = await Promise.all(
        prescriptions.map(async (prescription) => {
            const user = await userGet(prescription.userEmail);
            return { prescription, doctor, user };
        }),
    );
    res.send({ prescriptions: prescriptionsWithDoctor });
};

const getPrescriptionByPatient = async (req, res) => {
    const prescriptions = await prescriptionGetAllUser(req.user.email);
    const prescriptionsWithDoctor = await Promise.all(
        prescriptions.map(async (prescription) => {
            const doctor = await doctorGet(prescription.doctorId);
            const user = await userGet(prescription.userEmail);
            return { prescription, doctor, user };
        }),
    );
    res.send({ prescriptions: prescriptionsWithDoctor });
};

module.exports = {
    createPrescription,
    getPrescription,
    getPrescriptionByDoctor,
    getPrescriptionByPatient,
};
