/**
 * This is the module that is responsible for the express. A server with 2 endpoints is created.
 * This allows to get stocks' data from the file using the controllerIO module when 
 * no specific stock name is provided. When the user gives one, it gets the specific data 
 * about that stock using controllerFetch module.
 * @Date: 02-11-2022
 * @Author: Jacky Tat & Amina Turdalieva 
 * */
import express from 'express';
import { Singleton } from './controllers/controllerIO.mjs';
import { fetchAPI } from './controllers/controllerFetch.mjs';

const app = express();
const port = 3000;
const single = new Singleton();

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

//First endpoint that calls the singleton reading from a file to get all the symbols
app.get('/Symbol', async (req, res) => {
  let data;
  try {
    data = await single.getInstance();
  } catch {
    res.status(404).send("404 not found");
  }
  res.json(data.symbolsArray);
});

// Second endpoint that fetches specific info about a symbol when one is provided by the user 
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
if (single.getInstance() != null) {
  app.listen(port, () => {
    console.log(`Testing app at http://localhost:${port}`);
  });
} else {
  console.log("Error: Unable to retrieve the list of Symbols");
}