const express = require('express');
const router = express.Router();
const tablesController = require('../controllers/tableController');
const upload = require('../upload');

// Table routes
router.get('/', tablesController.getAllTables);
router.post('/create', upload.single('image'), tablesController.createTable);
router.put('/:id', upload.single('image'), tablesController.updateTable); // Додаємо middleware upload для оновлення
router.delete('/:id', tablesController.deleteTable);

module.exports = router;
