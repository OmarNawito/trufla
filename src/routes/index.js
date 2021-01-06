const express = require('express');

const articleRoute = require('./articles');
const authRoute = require('./auth');

const router = express.Router();

router.use('/articles', articleRoute);
router.use('/auth', authRoute);

module.exports = router;
