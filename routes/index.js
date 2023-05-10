const express = require('express');
const router = express.Router();

console.log('Router is loaded!');

router.use('/doctors', require('./doctors'));
router.use('/patients', require('./patients'));
// router.use('/reports', require('./resports'));

module.exports = router;