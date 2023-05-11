const express = require('express');
const router = express.Router();
const passport = require('passport');
const reportController = require('../controller/reportController');

// route to get reports which have specific status, reports data can be fetched only if authenticated doctor is logged in using jwt
router.get(
    '/:status',
    passport.authenticate('jwt', { session: false }),
    reportController.statusReport
)

module.exports = router;