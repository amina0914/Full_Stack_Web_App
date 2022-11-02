# Web Express Application that is hosted on http://localhost:3000/

To run the project  
Enter the following on the command line in the root folder of the project:

node app.mjs

## Purpose of the application is to provide specific stock information through user input.

## App Functions

### Server Side

- Uses fs/promises to read data from files (All Stock symbols)
- Provides one REST API endpoint to the client that returns all the symbols.
- Provides a second REST API endpoint that will receive a ticker symbol
- use the symbol to fetch info from the third party api
- send the data back to the client

### Client Side

- uses the list returned by the first API endpoint to populate the datalist with options of symbols (for selection)
- provide a form, when the user submits the form, the client sends a request to the second REST endpoint

## Task Delegation

### Amina

Did mostly Server Side Code

- FileIO: read data from files (retrieve symbols from file)
- Controllers: retrieve data from files and API
- Singleton
- Express

### Jacky

Did Mostly Client Side Code

- HTML, CSS, Javascript
- Linked Server Side code with Client Side code
- Express

## Group Project Summary

Group project started with a slight delay because we both initially had other work in priority. We also ran into a slight complication because Jacky took a sick day. However we still managed to communicate and get the work done without any major issues or complaints.
Overall we believe that the group project was a success and that we've fulfilled all of the demands in the given instructions.