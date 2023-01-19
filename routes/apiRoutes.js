const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');
  
// GET Route for retrieving notes
router.get('/', (req, res) => {
    readFromFile('./db/apiRoutes.json').then((data) => res.json(JSON.parse(data)));
  });
  
// GET Route for a specific note
router.get('/:notes_id', (req, res) => {
    const notesId = req.params.notes_id;
    readFromFile('./db/apiRoutes.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((notes) => notes.notes_id === notesId);
        return result.length > 0
          ? res.json(result)
          : res.json('No notes with that ID');
      });
  });
  
// DELETE Route for a specific note
router.delete('/:notes_id', (req, res) => {
    const notesId = req.params.notes_id;
    readFromFile('./db/apiRoutes.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all notes except the one with the ID provided in the URL
        const result = json.filter((notes) => notes.notes_id !== notesId);
  
        // Save that array to the filesystem
        writeToFile('./db/apiRoutes.json', result);
  
        // Respond to the DELETE request
        res.json(`Your ${notesId} is deleted`);
      });
  });
  
// POST Route for a new UX/UI note
router.post('/', (req, res) => {
    console.log(req.body);
  
    const { username, topic, tip } = req.body;
  
    if (req.body) {
      const newNote = {
        note,
        topic,
        notes_id: uuid.v4(),
      };
  
      readAndAppend(newNote, './db/apiRoutes.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });
  

  module.exports = router;
// //route to get notes
// app.get('/notes', (req, res) => res.json(notesData));

// //route for any note
// app.get('/notes/:note', (req, res) => {
//     // Coerce the specific search term to lowercase
//     const requestedNote = req.params.note.toLowerCase();
//     // Iterate through the terms name to check if it matches `req.params.note`
//     for (let i = 0; i < notesData.length; i++) {
//       if (requestedNote === notesData[i].note.toLowerCase()) {
//         return res.json(notesData[i]);
//       }
//     }
  
//     // Return a message if the term doesn't exist in our DB
//     return res.json('No match found');
//   });

