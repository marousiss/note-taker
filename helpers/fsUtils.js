const util = require('util');
const fs = require('fs');


//Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);


//Function to write data 
const writeToFile = (file, content) =>
    fs.writeFile(file, JSON.stringify(content, null, 4), (err) => 
        err ? console.error(err) : console.info(`\nData written to ${file}`));


//Function to add a note
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};


//Function to delete a note 
const readAndDelete = (file, id) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            const found = parsedData.some(note => note.id === id);
            if (found) {
                //const result = parsedData.filter(note => note.id !== id);
                writeToFile(file, parsedData.filter(note => note.id !== id));
            } else {
                console.error(`No note with the id of ${id} found.`);
                //Sends a bad request if id is not found
                res.status(400).json({msg: `No note with the id of ${id} found.`});
            }
        }
    });

};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };