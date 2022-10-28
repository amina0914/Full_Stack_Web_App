import express from 'express';
import {Singleton} from './controllers/controllerIO.mjs';
import { fetchAPI } from './controllers/controllerFetch.mjs';

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  if (req.query.name !== null ){
    let single = new Singleton();
    let data = await single.getInstance();
    res.send({message: "Test " + JSON.stringify(data) });
  } else {
    res.status(404).send("404 not found");
  }
});

app.get('/Symbol', async (req, res) => {
  if (req.query.name !== null ){
    // AAPL hardcoded, need to change to a regex of symbols 
    let result = await fetchAPI('AAPL');
    res.send({message: "Test " + JSON.stringify(result)});
  } else {
    res.status(404).send("404 not found");
  }
});

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Testing app at http://localhost:${port}`);
});