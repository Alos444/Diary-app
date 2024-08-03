const db = require('../db/connect');

class Entry {
    constructor({ id, user_id, date, text, category }) {
        this.id = id;
        this.user_id = user_id;
        this.date = date;
        this.text = text;
        this.category = category;
    }

    static async create({ user_id, date, text, category }) {
        const result = await db.query(
            'INSERT INTO entries (user_id, date, text, category) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, date, text, category]
        );
        return new Entry(result.rows[0]);
    }

    static async findById(id) {
        const result = await db.query('SELECT * FROM entries WHERE id = $1', [id]);
        if (result.rows.length === 0) return null;
        return new Entry(result.rows[0]);
    }

    static async findAll() {
        const result = await db.query('SELECT * FROM entries ORDER BY date DESC');
        return result.rows.map(row => new Entry(row));
    }

    async update() {
        const result = await db.query(
            'UPDATE entries SET date = $1, text = $2, category = $3 WHERE id = $4 RETURNING *',
            [this.date, this.text, this.category, this.id]
        );
        Object.assign(this, result.rows[0]);
    }

    async delete() {
        await db.query('DELETE FROM entries WHERE id = $1', [this.id]);
    }

    static async search(date, category) {
        let query = 'SELECT * FROM entries WHERE TRUE';
        const values = [];
        let valueIndex = 1;
        
        if (date) {
            query += ` AND DATE(date) = $${valueIndex++}`;
            values.push(date);
        }
        if (category) {
            query += values.length ? ` AND category ILIKE $${valueIndex++}` : ` AND category ILIKE $${valueIndex++}`;
            values.push(`%${category}%`);
        }

        console.log('Executing query:', query); // Debugging line
        console.log('With values:', values); // Debugging line

        try {
            const result = await db.query(query, values);
            return result.rows.map(row => new Entry(row));
        } catch (error) {
            console.error('Database query error:', error);
            throw error;
        }
    }
}

module.exports = Entry;
