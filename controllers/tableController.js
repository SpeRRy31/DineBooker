const Table = require('../models/table');

exports.getAllTables = async (req, res) => {
    try {
        const { page = 1, limit = 6, sort, filter } = req.query;
        const filters = filter ? JSON.parse(filter) : {};
        const query = Table.find(filters);
        if (sort) {
            query.sort(sort);
        }
        const totalItems = await Table.countDocuments(filters);
        const tables = await query.skip((page - 1) * limit).limit(Number(limit));
        res.status(200).json({ tables, totalItems });
    } catch (error) {
        res.status(500).json({ error: 'Помилка при отриманні столиків' });
    }
};

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

