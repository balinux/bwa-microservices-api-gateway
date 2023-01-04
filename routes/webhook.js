const express = require('express');
const router = express.Router();


const webhookhandler = require('./handler/webhook');


router.post('/', webhookhandler.webhook);

module.exports = router;