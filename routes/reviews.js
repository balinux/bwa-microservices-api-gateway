const express = require('express');
const router = express.Router();

const { APP_NAME } = process.env;

const reviewsHandler = require('./handler/reviews')

// middleware verify token
// const verifyToken = require('../middlewares/veryfyToken')

/* GET users listing. */
router.post('/', reviewsHandler.create);
router.put('/:id', reviewsHandler.update);
router.delete('/:id', reviewsHandler.destroy);

module.exports = router;
