const express = require('express');
const router = express.Router();

const { APP_NAME } = process.env;

const coursesHandler = require('./handler/courses')

// middleware verify token
const verifyToken = require('../middlewares/veryfyToken')

/* GET users listing. */
router.get('/', coursesHandler.getAll);
router.get('/:id', coursesHandler.get);
router.post('/', verifyToken, coursesHandler.create);
router.put('/:id', verifyToken, coursesHandler.update);
router.delete('/:id', verifyToken, coursesHandler.destroy);

module.exports = router;
