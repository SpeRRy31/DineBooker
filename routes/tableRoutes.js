const express = require('express');
const router = express.Router();
const tablesController = require('../controllers/tableController');

// Table routes
router.get('/', tablesController.getAllTables);
router.post('/', tablesController.createTable);
router.put('/:id', tablesController.updateTable);
router.delete('/:id', tablesController.deleteTable);

module.exports = router;
