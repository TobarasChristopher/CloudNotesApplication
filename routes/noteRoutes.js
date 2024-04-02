const express = require('express');
const router = express.Router();
const Note = require('../models/note');

// Display all notes
router.get('/', async (req, res) => {
    const notes = await Note.find();
    res.render('index', { notes });
});

// Display form to add a new note
router.get('/add', (req, res) => {
    res.render('add');
});

// Post request to add a new note
router.post('/', async (req, res) => {
    const note = new Note(req.body);
    await note.save();
    res.redirect('/notes');
});

// Display form to edit a note
router.get('/edit/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.render('edit', { note });
    } catch (error) {
        res.status(404).send("Note not found.");
    }
});


// Post request to update a note
router.post('/edit/:id', async (req, res) => {
    await Note.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/notes');
});

// Request to delete a note
router.delete('/delete/:id', async (req, res) => {
    try {
        await Note.findByIdAndRemove(req.params.id);
        res.status(200).send("Note deleted successfully");
    } catch (error) {
        console.error("Failed to delete note:", error);
        res.status(500).send("Error deleting note.");
    }
});

router.delete('/:id', async (req, res) => {
    // Deletion logic remains the same
});

module.exports = router;
