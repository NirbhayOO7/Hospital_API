const express = require('express');
const passport = require('passport');
const patientController = require('../controller/patientController');
const router = express.Router();

// route to register the patient, reports data can be fetched only if authenticated doctor is logged in using jwt
router.post(
    '/register',
    passport.authenticate('jwt', { session: false }),
    patientController.create
);

// route to create reports for a specific patient, reports data can be fetched only if authenticated doctor is logged in using jwt
router.post(
    '/:id/create_report',
    passport.authenticate('jwt', { session: false }),
    patientController.createReport
);

// route to get all reports for a specific patient,reports data can be fetched only if authenticated doctor is logged in using jwt
router.get(
    '/:id/all_reports',
    passport.authenticate('jwt', { session: false }),
    patientController.allReports
)

module.exports = router;