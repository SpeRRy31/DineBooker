const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Маршрут для створення резервування
router.post('/set_reserve', reservationController.createReservation);

module.exports = router;
