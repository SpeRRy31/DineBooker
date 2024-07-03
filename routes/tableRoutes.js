const express = require('express');
const router = express.Router();
const tablesController = require('../controllers/tableController');
const upload = require('../upload');

router.get('/', tablesController.getAllTables);
router.post('/create', upload.single('image'), tablesController.createTable);
router.get('/:id', tablesController.getTableById); 
router.put('/:id', upload.single('image'), tablesController.updateTable);
router.delete('/:id', tablesController.deleteTable);

module.exports = router;

