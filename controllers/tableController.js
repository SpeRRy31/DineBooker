const Table = require('../models/table');

// Отримання всіх столиків
exports.getAllTables = async (req, res) => {
    try {
        const tables = await Table.find();
        res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({ error: 'Помилка при отриманні столиків' });
    }
};


// Створення нового столика
exports.createTable = async (req, res) => {
    const { seats, hall, terrace, view, type, minimumOrder } = req.body;
    const image = req.file ? req.file.path.replace(/^.*[\\\/]/, 'uploads/') : '';

    try {
        const newTable = new Table({
            seats,
            location: {
                hall,
                terrace,
                view
            },
            type,
            minimumOrder,
            image
        });

        await newTable.save();
        res.status(201).json(newTable);
    } catch (error) {
        res.status(500).json({ error: 'Помилка при додаванні столика' });
    }
};

// Оновлення столика
exports.updateTable = async (req, res) => {
    const { id } = req.params;
    const { seats, hall, terrace, view, type, minimumOrder, availability, reservationTimeStart, reservationTimeEnd } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        const updatedTable = await Table.findByIdAndUpdate(
            id,
            {
                seats,
                location: {
                    hall,
                    terrace,
                    view
                },
                type,
                minimumOrder,
                availability,
                reservationTime: {
                    start: reservationTimeStart,
                    end: reservationTimeEnd
                },
                ...(image && { image })
            },
            { new: true }
        );

        if (!updatedTable) {
            return res.status(404).json({ error: 'Столик не знайдено' });
        }

        res.status(200).json(updatedTable);
    } catch (error) {
        res.status(500).json({ error: 'Помилка при оновленні столика' });
    }
};

// Видалення столика
exports.deleteTable = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTable = await Table.findByIdAndDelete(id);

        if (!deletedTable) {
            return res.status(404).json({ error: 'Столик не знайдено' });
        }

        res.status(200).json({ message: 'Столик успішно видалено' });
    } catch (error) {
        res.status(500).json({ error: 'Помилка при видаленні столика' });
    }
};

// Отримання столика за ідентифікатором
exports.getTableById = async (req, res) => {
    const { id } = req.params;

    try {
        const table = await Table.findById(id);

        if (!table) {
            return res.status(404).json({ error: 'Столик не знайдено' });
        }

        res.status(200).json(table);
    } catch (error) {
        res.status(500).json({ error: 'Помилка при отриманні столика' });
    }
};

