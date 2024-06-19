const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const path = require('path');
const usersRoutes = require('./routes/userRoutes');
const tablesRoutes = require('./routes/tableRoutes');
const mesRoutes = require('./routes/mesRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/DineDB', {})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/DineDB' })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', usersRoutes);
app.use('/api/tables', tablesRoutes);
app.use('/api/mes', mesRoutes);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
