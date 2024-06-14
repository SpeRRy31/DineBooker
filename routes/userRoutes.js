const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');

// Register route
router.post('/register', usersController.register);

// Login route
router.post('/login', usersController.login);

module.exports = router;
