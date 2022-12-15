const express = require('express');
const router = express.Router();
const { APP_NAME } = process.env;

const mediahandler = require('./handler/media')

/* GET media listing. */
router.get('/', mediahandler.getAllMedia);
router.post('/', mediahandler.create)
router.delete('/:id', mediahandler.destroy)

module.exports = router;
