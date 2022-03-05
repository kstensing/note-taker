const express = require('express');
const res = require('express/lib/response');

const app = express();

app.get('/api/notes', (req, res) => {
    console.log("here")
    res.json({ // saved notes? })
        // if we want to send a file back res.render('index')
});

app.post('/api/notes', (req, res) => {
    
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../notes.html'));
});

//not sure on the path
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});