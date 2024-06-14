const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user');

// Реєстрація користувача
exports.register = async (req, res) => {
    // Реалізуйте реєстрацію користувача тут
};

// Вхід користувача
exports.login = async (req, res) => {
    // Реалізуйте вхід користувача тут
};
