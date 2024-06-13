const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./db/user_model');

const app = express();
const PORT = process.env.PORT || 3000;

// Підключення до MongoDB
mongoose.connect('mongodb://localhost:27017/my_database')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('connection error:', err));

// Налаштування Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret_key', // Замініть на ваш секретний ключ
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Встановіть true, якщо використовуєте HTTPS
}));

app.use(express.static('public'));

// Маршрути
app.post('/register', (req, res) => {
    const { name, surname, email, password, number, age } = req.body;

    const newUser = new User({ name, surname, email, password, number, age });
    newUser.save()
        .then(() => res.json({ success: true }))
        .catch(err => res.status(500).json({ success: false, message: 'Error registering new user' }));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email, password })
        .then(user => {
            if (user) {
                req.session.userId = user._id;
                res.json({ success: true });
            } else {
                res.status(400).json({ success: false, message: 'Invalid credentials' });
            }
        })
        .catch(err => res.status(500).json({ success: false, message: 'Error logging in' }));
});

app.get('/session', (req, res) => {
    if (req.session.userId) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
