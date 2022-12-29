const express = require('express');
const router = express.Router();
const { APP_NAME } = process.env;

const mentorsHandler = require('./handler/mentors')

/* GET mentor listing. */

router.get('/', mentorsHandler.getAll);
router.get('/:id', mentorsHandler.get);
router.post('/', mentorsHandler.create);

module.exports = router;
