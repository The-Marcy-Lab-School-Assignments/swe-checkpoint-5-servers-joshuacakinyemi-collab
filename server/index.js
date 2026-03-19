const express = require('express');
const path = require('path');
const app = express();


// TODO: Import your controllers from ./controllers/petControllers.js

let pathToFrontend = path.join(__dirname, '../frontend');
if (process.env.NODE_ENV === 'production') {
  pathToFrontend = path.join(__dirname, '../frontend/dist');
}

const petControllers = require('./controllers/petControllers.js');

/////////////////////
// Middleware
/////////////////////

// TODO: Create a logRoutes middleware function that logs the method and
// originalUrl of every incoming request, along with the current time.
const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

// TODO: Add the express.json() middleware to parse JSON request bodies.
app.use(logRoutes);
app.use(express.json());
app.use(express.static(pathToFrontend));

// TODO: Serve the frontend/ folder as static assets using express.static()


/////////////////////
// Endpoints
/////////////////////

// TODO: Define RESTful endpoints for managing pets.

app.get('/api/pets', petControllers.listPets);
app.get('/api/pets/:id', petControllers.getPet);
app.post('/api/pets', petControllers.createPet);
app.patch('/api/pets/:id', petControllers.updatePet);
app.delete('/api/pets/:id', petControllers.deletePet);

app.use((req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  res.sendFile(path.join(pathToFrontend, 'index.html'));
});

const port = 8080;
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
