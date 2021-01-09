const express = require('express');

const articleRoute = require('./articles');
const authRoute = require('./auth');
const userRoute = require('./users');


const router = express.Router();

router.use('/articles', articleRoute);
router.use('/auth', authRoute);
router.use('/users', userRoute);


module.exports = router;
