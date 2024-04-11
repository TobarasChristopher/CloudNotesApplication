const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 8443;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

// Database setup
const db = new sqlite3.Database('./database/database.sqlite');

// Your routes will go here

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Display all notes
app.get('/', (req, res) => {
  db.all('SELECT * FROM notes', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.render('index', { notes: rows });
  });
});

// Add a new note
app.post('/add', (req, res) => {
  const { title, content } = req.body;
  db.run('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content], (err) => {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
});

// Display edit note form
app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM notes WHERE id = ?', [id], (err, row) => {
    if (err) {
      throw err;
    }
    res.render('edit', { note: row });
  });
});

// Update note
app.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  db.run('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, id], function(err) {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
});

// Delete note
app.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM notes WHERE id = ?', id, function(err) {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
});