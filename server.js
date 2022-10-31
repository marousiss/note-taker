const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);

app.use(express.static(path.join(__dirname, 'public')));

//GET Route for home page
app.get('/index', (req, res) => {
    //render index.html page
    res.sendFile(path.join(__dirname, 'public/index.html'));
}); 


//GET Route for notes page
app.get('/notes', (req, res) => {
    //render index.html page
    res.sendFile(path.join(__dirname, 'public/notes.html'));
}); 


//Return index.html file
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));


app.listen(PORT, () => console.log(`\nApp listening at http://localhost:${PORT}`));