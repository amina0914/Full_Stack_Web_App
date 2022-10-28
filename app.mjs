import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  if (req.query.name !== null ){
    res.send({message: "Test " });
  } else {
    res.status(404).send("404 not found");
  }
});

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Testing app at http://localhost:${port}`);
});