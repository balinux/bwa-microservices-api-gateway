const express = require('express');
const { route } = require('.');
const router = express.Router();
const { APP_NAME } = process.env;

const refreshTokensHandler = require('./handler/refresh-tokens')

/* Post refresh token. */
router.post('/', refreshTokensHandler.refreshToken);

module.exports = router;
