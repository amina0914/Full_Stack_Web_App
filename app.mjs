import express from 'express';
import { Singleton } from './controllers/controllerIO.mjs';
import { fetchAPI } from './controllers/controllerFetch.mjs';

const app = express();
const port = 3000;

// This is the homepage, in other words, the /public/index.html
app.use(express.static('public'))

// Default 404 status
app.get('/', (req, res) => {
  res.status(404).send("404 not found");
})

// This is the request to obtain data
app.get('/Symbol', async (req, res) => {
  // If there are no query, return json list of all Symbols
  if (req.query.name == null) {
    let single = new Singleton();
    let data = await single.getInstance();
    res.json(data.symbolsArray);
  } else {
    // Request to obtain stock information
    let result = await fetchAPI(req.query.name);
    res.json(result);
  }
});

app.listen(port, () => {
  console.log(`Testing app at http://localhost:${port}`);
});