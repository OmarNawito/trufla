const express = require('express');
const auth = require('../middlewares/auth');
const userController = require('../controllers/user.controller');
const authValidation = require('../validations/auth.validation');
const validate = require('../middlewares/validate');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(authValidation.register), userController.createUser)
  .get(auth('getUsers'), userController.getUsers);

router
  .route('/:userId')
  .get(auth('getUsers'), userController.getUser)

module.exports = router;
