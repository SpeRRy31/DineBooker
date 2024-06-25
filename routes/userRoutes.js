const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');

// Register route
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/profile', usersController.getProfile);
router.get('/getUserIdByEmail/:email', usersController.getUserIdByEmail);

module.exports = router;
