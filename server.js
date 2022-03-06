const express = require('express');
const fs = require('fs');
const path = require('path');
//const res = require('express/lib/response');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/develop/public/notes.html'));
});

// not sure on the path
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/develop/public/index.html'));
});

// app.get('/api/notes', (req, res) => {
//     console.log("here")
//     res.json({ // saved notes? })
//         // if we want to send a file back res.render('index')
// });

// app.post('/api/notes', (req, res) => {

// });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);