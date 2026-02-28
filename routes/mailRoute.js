const router = require('express').Router();
const sendMail = require('../services/mailService');


router.post('/send', sendMail.sendMailLocation);

module.exports = router;