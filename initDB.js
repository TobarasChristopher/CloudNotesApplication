const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.sqlite');

db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL
  )`);
});

db.close();