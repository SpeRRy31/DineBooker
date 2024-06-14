const express = require('express');
const router = express.Router();
const mesController = require('../controllers/mesController');

// Створення нового повідомлення
router.post('/writemes', mesController.createMessage);

// Отримання всіх повідомлень
router.get('/', mesController.getMessages);

module.exports = router;
