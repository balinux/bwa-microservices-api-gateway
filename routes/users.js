const express = require('express');
const router = express.Router();
const { APP_NAME } = process.env;

const usershandler = require('./handler/users')

/* Post User Register. */
router.post('/register', usershandler.register)

module.exports = router;
