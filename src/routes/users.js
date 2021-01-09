const express = require('express');
const auth = require('../middlewares/auth');
const userController = require('../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), userController.createUser)
  .get(auth('getUsers'), userController.getUsers);

router
  .route('/:userId')
  .get(auth('getUsers'), userController.getUser)
  .patch(auth('manageUsers'), userController.updateUser)
  .delete(auth('manageUsers'), userController.deleteUser);

module.exports = router;
