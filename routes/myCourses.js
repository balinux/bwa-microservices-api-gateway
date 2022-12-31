const express = require('express');
const router = express.Router();
const { APP_NAME } = process.env;

const myCoursesHandler = require('./handler/my-courses')

/* GET mentor listing. */

router.get('/', myCoursesHandler.get);
router.post('/', myCoursesHandler.create);

module.exports = router;
