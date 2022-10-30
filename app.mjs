import express from 'express';
import { Singleton } from './controllers/controllerIO.mjs';
import { fetchAPI } from './controllers/controllerFetch.mjs';

const app = express();
const port = 3000;

// This is the homepage, in other words, the /public/index.html
app.use(express.static('public'))

// This is the request to obtain data
app.get('/Symbol', async (req, res) => {
  let single = new Singleton();
  let data;
  try {
    data = await single.getInstance();
  } catch {
    res.status(404).send("404 not found");
  }
  res.json(data.symbolsArray);
});

app.get('/Search', async (req, res) => {
  let result;
  try {
    result = await fetchAPI(req.query.name);
  } catch {
    res.status(404).send("404 not found");
  }
  res.json(result);
})

// Default 404 status
app.use('/', (req, res) => {
  res.status(404).send("404 not found");
})

app.listen(port, () => {
  console.log(`Testing app at http://localhost:${port}`);
});