const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/veryfyToken')

const { APP_NAME } = process.env;

/* GET users listing. */
router.get('/', verifyToken, function (req, res, next) {
  res.send('courses');
});

module.exports = router;
