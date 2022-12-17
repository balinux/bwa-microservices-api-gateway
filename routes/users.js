const express = require('express');
const router = express.Router();
const { APP_NAME } = process.env;

const usershandler = require('./handler/users')
const verifyToken = require('../middlewares/veryfyToken')


/* Post User Register. */
router.post('/register', usershandler.register)

/* Post User Login. */
router.post('/login', usershandler.login)

/* Post User Login. */
router.post('/logout', verifyToken, usershandler.logout)

/* Post User update. */
router.put('/', verifyToken, usershandler.update)

/* Get User . */
router.get('/', verifyToken, usershandler.getUser)

module.exports = router;
