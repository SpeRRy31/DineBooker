const Reservation = require('../models/reservation');
const Table = require('../models/table');
const User = require('../models/user');

exports.createReservation = async (req, res) => {
    const { userId, tableId, name, phone } = req.body;

    if (!userId || !tableId || !name || !phone) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const table = await Table.findById(tableId);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }

        const reservation = new Reservation({ userId, tableId, name, phone });
        await reservation.save();

        res.status(201).json({ message: 'Reservation created successfully' });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('userId').populate('tableId');
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
