const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3773;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/studentNotes', { useNewUrlParser: true, useUnifiedTopology: true });

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Require routes
const noteRoutes = require('./routes/noteRoutes');
app.use('/notes', noteRoutes);

app.get('/', (req, res) => res.redirect('/notes'));

app.listen(port, () => console.log(`Server running on port ${port}`));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));