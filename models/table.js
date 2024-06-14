const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
    seats: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        enum: ['Free', 'Reserved'],
        default: 'Free'
    },
    reservationTime: {
        start: { type: Date },
        end: { type: Date }
    },
    type: {
        type: String,
        enum: ['Regular', 'VIP', 'Disabled'],
        default: 'Regular'
    },
    minimumOrder: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Table', TableSchema);
