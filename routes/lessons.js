const express = require('express');
const router = express.Router();

const { APP_NAME } = process.env;

const lessonsHandler = require('./handler/lessons')

// middleware verify token
// const verifyToken = require('../middlewares/veryfyToken')

/* GET users listing. */
router.get('/', lessonsHandler.getAll);
router.get('/:id', lessonsHandler.get);
router.post('/', lessonsHandler.create);
router.put('/:id', lessonsHandler.update);
router.delete('/:id', lessonsHandler.destroy);

module.exports = router;
