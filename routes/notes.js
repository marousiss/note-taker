const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');

const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');

const fileName = './db/db.json';

//GET Route for retrieving all the notes '/api/notes'
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);

    readFromFile(fileName).then((data) => res.json(JSON.parse(data)));
    
});


//POST Route to add a new note '/api/notes'
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    //Update the file if all the properties are available
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        }
        readAndAppend(newNote, fileName);
        res.json(`Note added successfully!`);
    } else {
        res.status(500).json('Error in adding note');
    }

});

//DELETE router to delete a spacified note '/api/notes/:id'
notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);
    console.log("delete the item for this id: " + req.params.id);
    const id = req.params.id;
    // check if id was passd as a parameter
    if (id) {
        readAndDelete(fileName, id);
    }
    
});

module.exports = notes;