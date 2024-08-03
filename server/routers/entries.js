const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entries');

// Create a new entry
router.post('/', entryController.createEntry);

// Get all entries
router.get('/', entryController.getAllEntries);

// Get a single entry by ID
router.get('/:id', entryController.getEntryById);

// Update an entry
router.put('/:id', entryController.updateEntry);

// Delete an entry
router.delete('/:id', entryController.deleteEntry);

// Search entries
router.get('/search', entryController.searchEntries);

module.exports = router;



