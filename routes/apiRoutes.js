const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    getNotes,
    writeToFile,
  } = require('../helpers/fsUtils');
  const path = require('path');
const { read } = require('fs');
// GET Route for retrieving notes
router.get('/notes', (req, res) => {
    // res.sendFile(path.join(__dirname,"../db/db.json"))
    getNotes('./db/apiRoutes.json').then((data) => res.json(data));
  });
  
// GET Route for a specific note
router.get('/:id', (req, res) => {
    const notesId = req.params.id;
    readFromFile('./db/apiRoutes.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((notes) => notes.id === notesId);
        return result.length > 0
          ? res.json(result)
          : res.json('No notes with that ID');
      });
  });
  
// // DELETE Route for a specific note
// router.delete('/:notes_id', (req, res) => {
//     const notesId = req.params.notes_id;
//     readFromFile('./db/apiRoutes.json')
//       .then((data) => JSON.parse(data))
//       .then((json) => {
//         // Make a new array of all notes except the one with the ID provided in the URL
//         const result = json.filter((notes) => notes.notes_id !== notesId);
  
//         // Save that array to the filesystem
//         writeToFile('./db/apiRoutes.json', result);
  
//         // Respond to the DELETE request
//         res.json(`Your ${notesId} is deleted`);
//       });
//   });
  
// POST Route for a new UX/UI note
router.post('/notes', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4()
      };
  
      writeToFile('./db/apiRoutes.json', newNote );
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });
  

  module.exports = router;

