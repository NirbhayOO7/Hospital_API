const express = require('express');
const passport = require('passport');
const patientController = require('../controller/patientController');
const router = express.Router();


router.post(
    '/register',
    passport.authenticate('jwt', { session: false }),
    patientController.create
);

router.post(
    '/:id/create_report',
    passport.authenticate('jwt', { session: false }),
    patientController.createReport
);

router.get(
    '/:id/all_reports',
    passport.authenticate('jwt', { session: false }),
    patientController.allReports
)

module.exports = router;