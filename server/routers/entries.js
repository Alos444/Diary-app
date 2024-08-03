

const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entries');


router.post('/', entryController.createEntry);
router.get('/', entryController.getAllEntries);
router.get('/:id', entryController.getEntryById);
router.put('/:id', entryController.updateEntry);
router.delete('/:id', entryController.deleteEntry);
router.get('/search', entryController.searchEntries);

module.exports = router;


