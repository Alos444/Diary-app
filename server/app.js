const express = require('express');
const path = require('path');
const entryRoutes = require('./routers/entries');
const logger = require('./logger');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(logger);
app.use(express.static(path.join(__dirname, '../client')));
app.use('/api/entries', entryRoutes);

app.use((err, req, res, next) => {
    logger.error(`Server Error: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;

