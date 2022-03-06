const express = require('express');
const fs = require('fs');
const path = require('path');
const noteData = require('./db/db.json');
const uuid = require('uuid');

//const res = require('express/lib/response');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// one or the other:
app.get('/api/notes', (req, res) => res.json(noteData));

app.post('/api/notes', (req, res) => {
    res.json(req.body);




});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);