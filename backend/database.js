const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./findzy.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the findzy database.');
});

db.serialize(() => {
    // Restaurants table
    db.run(`CREATE TABLE IF NOT EXISTS restaurants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        cuisine TEXT,
        rating REAL,
        price TEXT,
        image_url TEXT,
        offer_tag TEXT
    )`, (err) => {
        if (err) {
            return console.error('Error creating restaurants table:', err.message);
        }
        console.log("Checked 'restaurants' table.");
    });

    // Comments table
    db.run(`CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        comment TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            return console.error('Error creating comments table:', err.message);
        }
        console.log("Checked 'comments' table.");
    });
});

module.exports = db;
