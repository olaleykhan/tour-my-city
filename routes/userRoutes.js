const express = require('express');


const userController = require('../controllers/userController');


const router = express.Router();
router
  .route('/')
    .get(userController.getAllUsers)
    .post(userController.AddUser)

router.route('/:id')
    .get(userController.getUserbyID)
    .post(userController.updateUser)

module.exports = router;