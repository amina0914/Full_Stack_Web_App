import express from 'express';
import { Singleton } from './controllers/controllerIO.mjs';
import { fetchAPI } from './controllers/controllerFetch.mjs';

const app = express();
const port = 3000;

// This is the homepage, in other words, the /public/index.html
app.use(express.static('public'))

/**
 * This GET request will return 
 * JSON list of all symbols if there are no queries
 * else return json stock info
 * @param  {String} '/Symbol' URL path on the server
 * @param  {Request} req Request object
 * @param  {Response} res Response object
 */
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

// Default 404 status
/**
 * If any other path is entered, return a status 404
 * @param  {String} '/' Universal server path
 * @param  {Request} req Request Object
 * @param  {Response} res Response Object
 */
app.use('/', (req, res) => {
  res.status(404).send("404 not found");
})

/**
 * Start Server and listen on specified port
 * @param {Int} port Port that the server listens to
 */
app.listen(port, () => {
  console.log(`Testing app at http://localhost:${port}`);
});