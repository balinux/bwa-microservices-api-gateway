const express = require('express');
const router = express.Router();

const { APP_NAME } = process.env;

const chaptersHandler = require('./handler/chapters')

// middleware verify token
// const verifyToken = require('../middlewares/veryfyToken')

/* GET users listing. */
router.get('/', chaptersHandler.getAll);
router.get('/:id', chaptersHandler.get);
router.post('/', chaptersHandler.create);
router.put('/:id', chaptersHandler.update);
router.delete('/:id', chaptersHandler.destroy);

module.exports = router;
