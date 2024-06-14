const Mes = require('../models/mes');

// Створення нового повідомлення
exports.createMessage = async (req, res) => {
    try {
        const newMessage = new Mes(req.body);
        const message = await newMessage.save();
        res.json(message);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Отримання всіх повідомлень
exports.getMessages = async (req, res) => {
    try {
        const messages = await Mes.find();
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
