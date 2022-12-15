const express = require('express');
const router = express.Router();
const { APP_NAME } = process.env;

const mediahandler = require('./handler/media')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('media');
});

router.post('/', mediahandler.create)

module.exports = router;
