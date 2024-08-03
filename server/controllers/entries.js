const Entry = require('../models/Entry');

exports.createEntry = async (req, res) => {
    try {
        const { user_id, date, text, category } = req.body;
        const entry = await Entry.create({ user_id, date, text, category });
        res.status(201).json(entry);
    } catch (error) {
        console.error('Error creating entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllEntries = async (req, res) => {
    try {
        const entries = await Entry.findAll();
        res.status(200).json(entries);
    } catch (error) {
        console.error('Error fetching entries:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getEntryById = async (req, res) => {
    try {
        const entry = await Entry.findById(req.params.id);
        if (entry) {
            res.status(200).json(entry);
        } else {
            res.status(404).json({ error: 'Entry not found' });
        }
    } catch (error) {
        console.error('Error fetching entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateEntry = async (req, res) => {
    try {
        const entry = await Entry.findById(req.params.id);
        if (entry) {
            entry.date = req.body.date;
            entry.text = req.body.text;
            entry.category = req.body.category;
            await entry.update();
            res.status(200).json(entry);
        } else {
            res.status(404).json({ error: 'Entry not found' });
        }
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteEntry = async (req, res) => {
    try {
        const entry = await Entry.findById(req.params.id);
        if (entry) {
            await entry.delete();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Entry not found' });
        }
    } catch (error) {
        console.error('Error deleting entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.searchEntries = async (req, res) => {
    try {
        const { date, category } = req.query;
        const entries = await Entry.search(date, category);
        res.status(200).json(entries);
    } catch (error) {
        console.error('Error searching entries:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
