const express = require('express');
const db = require('./database.js');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API Endpoints ---

// GET all restaurants
app.get('/api/restaurants', (req, res) => {
    const sql = "SELECT * FROM restaurants";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        });
    });
});

// GET all comments
app.get('/api/comments', (req, res) => {
    const sql = "SELECT * FROM comments ORDER BY created_at DESC";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        });
    });
});

// POST a new comment
app.post('/api/comments', (req, res) => {
    const { name, comment } = req.body;
    if (!name || !comment) {
        res.status(400).json({"error": "Name and comment are required."});
        return;
    }

    const sql = `INSERT INTO comments (name, comment) VALUES (?, ?)`;
    db.run(sql, [name, comment], function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID, name, comment }
        });
    });
});


// --- Static File Serving ---

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '..')));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    // Initialize the database tables
    db.serialize();
});
