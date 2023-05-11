const express = require('express');
const router = express.Router();

console.log('Router is loaded!');

// routes defined for each action 

router.use('/doctors', require('./doctors'));
router.use('/patients', require('./patients'));
router.use('/reports', require('./reports'));

module.exports = router;