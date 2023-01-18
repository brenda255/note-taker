const router = require('express').Router();

//route to get notes
app.get('/notes', (req, res) => res.json(notesData));

//route for any note
app.get('/notes/:note', (req, res) => {
    // Coerce the specific search term to lowercase
    const requestedNote = req.params.note.toLowerCase();
    // Iterate through the terms name to check if it matches `req.params.note`
    for (let i = 0; i < notesData.length; i++) {
      if (requestedNote === notesData[i].note.toLowerCase()) {
        return res.json(notesData[i]);
      }
    }
  
    // Return a message if the term doesn't exist in our DB
    return res.json('No match found');
  });