const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
    seats: {
        type: Number,
        enum: [2, 4, 6, 8, 10, 12, 14, 16, 20],
        required: true
    },
    location: {
        hall: {
            type: String,
            enum: ['Основний', 'VIP'],
            required: true
        },
        terrace: {
            type: String,
            enum: ['Відкрита', 'Закрита'],
            required: true
        },
        view: {
            type: String,
            enum: ['На вулицю', 'На парк', 'На річку'],
            required: true
        }
    },
    availability: {
        type: String,
        enum: ['Вільний', 'Зарезервований'],
        default: 'Вільний'
    },
    reservationTime: {
        start: { type: Date },
        end: { type: Date }
    },
    type: {
        type: String,
        enum: ['Звичайний', 'VIP', 'Для людей з інвалідністю'],
        default: 'Звичайний'
    },
    minimumOrder: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: "#"
    }
});

module.exports = mongoose.model('Table', TableSchema);
