'use strict';

const { hospitalCreate } = require('./hospital.crud');
const { userCreate } = require('./user.crud');
const { doctorCreate } = require('./doctor.crud');
const { scheduleCreate } = require('./doctor_schedule.crud');

const createHospitals = async () => {
    await hospitalCreate(
        'Apollo Gleanagles',
        '9385739285',
        '3498203482',
        'A-1, Shyam Bhavan, B.p.road, Near Udipi Beer Bar, Bhayander (east)',
    );
    await hospitalCreate(
        'Lakeland Medical Clinic',
        '9849384753',
        '9832049823',
        '134-a, Sarawati Sadan, J P Road, Opp Navrang Cinema, Andheri (west)',
    );
    await hospitalCreate(
        'Southshore General Hospital',
        '3232423432',
        '9483947332',
        '102, 63/71, 4th Floor, Dadiseth Agyari Lane, Kalbadevi Road, Nr Adarsh Baug Hotel, Kalbadevi',
    );
    await hospitalCreate(
        'Oak Crest Hospital',
        '3354684934',
        '3982928323',
        '21, Shakuntala, Manav Madir Rd, Malabar Hill',
    );
    await hospitalCreate(
        'Honor Grave Hospital',
        '9848343743',
        '9847577292',
        'Shop No.5, Plot No.35, Vini Chs Ltd, Sector 16, New Panvel, Navi Mumbai',
    );
    await hospitalCreate(
        'Hopevale Medical Clinic',
        '9429034442',
        '5309590480',
        'Doshi Chambers, Masjid Bunder(e)',
    );
    await hospitalCreate(
        'Grand Valley Clinic',
        '9488285733',
        '3485903853',
        '156/a, Ekdalia Road, Ballygunj',
    );
    await hospitalCreate(
        'Fairmont Hospital Center',
        '9329488423',
        '4824734343',
        '27 Pump House Bldg, 1027 Aghadi Nagar, Andheri (east)',
    );
};

const createUsers = async () => {
    await userCreate(
        'angel@dev.io',
        'password1234',
        'Angel HackX',
        new Date(),
        '983758294',
        'Female',
        '102, Road View Street, Mumbai',
        '9574827512',
        'User',
    );
    await userCreate(
        'siddharthsingharoy@gmail.com',
        'password1234',
        'Siddharth Singha Roy',
        new Date(),
        '9053534365',
        'Male',
        '102, Southern Avenue, Kolkata',
        '6254555387',
        'User',
    );
    await userCreate(
        'biswas@gmail.com',
        'password1234',
        'Dr. Akshay Biswas',
        new Date(),
        '1837581233',
        'Male',
        '102, New India Road, Delhi',
        '1425645742',
        'Doctor',
    );
    await userCreate(
        'vivian2019.roy@gmail.com',
        'password1234',
        'Dr. Vivian Roy',
        new Date(),
        '8473757383',
        'Female',
        '21/A Pegasus Road, Hyderabad',
        '8475394834',
        'Doctor',
    );
    await userCreate(
        'drarunjackson@gmail.com',
        'password1234',
        'Dr. Arun Jackson',
        new Date(),
        '7587395857',
        'Male',
        '45/1 Chatterjee Road, Kolkata',
        '1367267426',
        'Doctor',
    );
    await userCreate(
        'sapien@gmail.com',
        'password1234',
        'Dr. Volk Sapien',
        new Date(),
        '9384758393',
        'Male',
        'Sarat Bose Road - 21/A, Chennai',
        '8474738409',
        'Doctor',
    );
    await userCreate(
        'patie.jones1977@gmail.com',
        'password1234',
        'Dr. Patie Jones',
        new Date(),
        '9837175638',
        'Female',
        '192/A Gandhi Road, Kolkata',
        '9068137426',
        'Doctor',
    );
};

const createDoctors = async () => {
    await doctorCreate(
        21,
        '748573957',
        'MBBS, MD, MM',
        'Cardiologists',
        true,
        'biswas@gmail.com',
        1,
    );
    await doctorCreate(
        15,
        '747583024',
        'B.Med, DO, DS',
        'Cardiologists',
        true,
        'vivian2019.roy@gmail.com',
        1,
    );
    await doctorCreate(
        15,
        '98375618394',
        'B.Med, DO, DS',
        'Cardiologists',
        true,
        'sapien@gmail.com',
        1,
    );
    await doctorCreate(
        15,
        '85747593857',
        'B.Med, DO, DS',
        'Cardiologists',
        true,
        'patie.jones1977@gmail.com',
        1,
    );
    await doctorCreate(
        9,
        '7473685930',
        'BMBS, DO, DCM',
        'Dermatologists',
        true,
        'drarunjackson@gmail.com',
        2,
    );
};

const createSchedule = async () => {
    await scheduleCreate(
        'Saturday',
        '10:00',
        '14:30',
        true,
        'Video Conferencing',
        50,
        2,
    );
    await scheduleCreate('Sunday', '10:00', '14:30', true, 'Video Conferencing', 50, 2);
    await scheduleCreate('Monday', '10:00', '14:30', true, 'Video Conferencing', 50, 2);
    await scheduleCreate('Sunday', '10:00', '14:30', true, 'Video Conferencing', 20, 1);
    await scheduleCreate('Sunday', '17:00', '23:30', true, 'Video Conferencing', 20, 1);
    await scheduleCreate('Monday', '11:00', '14:30', true, 'Video Conferencing', 10, 1);
    await scheduleCreate('Monday', '17:00', '20:30', true, 'Video Conferencing', 25, 1);
    await scheduleCreate(
        'Wednesday',
        '15:00',
        '19:30',
        false,
        '102, Southern Avenue, Kolkata',
        35,
        1,
    );
};

const setup = async () => {
    await createHospitals();
    await createUsers();
    await createDoctors();
    await createSchedule();
};

setup()
    .then(() => console.log('\n\nSETUP COMPLETE'))
    .catch((err) => console.error(err));
