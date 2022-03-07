const express = require('express');
const fs = require('fs');
const path = require('path');
// const noteData = require('./db/db.json');
const uniqid = require('uniqid');

const res = require('express/lib/response');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});


app.get('/api/notes', (req, res) => {

    fs.readFile('./db/db.json', 'utf8', (err, noteData) => {
        if (err) {
            console.error(err);
        }
        const allNotes = JSON.parse(noteData);
        res.json(allNotes);
    });
});

app.delete('/api/notes/:id', (req, res) => {

    if (req.params.id) {
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                //add a new note
                //parsedNotes.push(newNote);

                const noteId = req.params.id;
                var noteToBeDeleted = '';
                for (let i = 0; i < parsedNotes.length; i++) {

                    const currentNote = parsedNotes[i];
                    if (currentNote.id === noteId) {
                        noteToBeDeleted = i;
                    }
                }
                if (noteToBeDeleted === '') {
                    console.error('That ID doesn\'t exist');
                    return;
                }
                res.json(noteToBeDeleted);
                parsedNotes.splice(noteToBeDeleted, 1)

                fs.writeFileSync(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                    writeErr ?
                    console.error(writeErr) :
                    console.info('Successfully updated notes!')
                );
                return;
            }
        })
    }
});

app.post('/api/notes', (req, res) => {

    const {
        title,
        text
    } = req.body;

    if (title && text) {
        //variable for the new object will save
        const newNote = {
            title,
            text,
            id: uniqid(),
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                //add a new note
                parsedNotes.push(newNote);

                fs.writeFileSync(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                    writeErr ?
                    console.error(writeErr) :
                    console.info('Successfully updated notes!')
                );
            }
        });

        const message = {
            status: 'success',
            body: newNote,
        };
        res.json(message);
    } else {
        res.json('Error in adding new note');
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);