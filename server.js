const express = require('express');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const router = express();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static('public'));

router.use(routes);
  
// GET Route for homepage
router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes
router.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


  // Listen for connections
router.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);
