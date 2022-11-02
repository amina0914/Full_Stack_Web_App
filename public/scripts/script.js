/**
 * This is the script file that is responsible for linking the backend to the frontend 
 * of the webpage. The fetching methods are used to fetch from the API the data about the stocks.
 * Once the data is fetched, it is displayed to the user. 
 * @Date: 02-11-2022
 * @Author: Jacky Tat
 * */

"use strict";

document.addEventListener('DOMContentLoaded', setup)

const form = document.querySelector("form");
form.addEventListener("submit", getStock);
const symbolList = document.querySelector("#stock-list")

function setup() {
  getSymbols();
}

/**
 * First Fetch to obtain the list of all symbols of stocks
 * And add them to the datalist
 */
async function getSymbols() {
  let url = new URL("http://localhost:3000/Symbol")
  let response = await fetch(url)
  let content;
  if (response.ok) {
    content = await response.json();
  }
  content.forEach(element => {
    let option = document.createElement("option");
    option.value = element.symbol;
    symbolList.appendChild(option);
  })
}

/**
 * Second Fetch, executed only after pressing the submit button
 * Updates the DOM with the result of the Search query
 * @param {event} e Event Object
 */
async function getStock(e) {
  e.preventDefault();

  // Retrieve user input
  let input = document.querySelector("#stock-choice").value;

  // fetch url with input as the query paramter
  let url = new URL(`http://localhost:3000/Search?name=${input}`)

  let response = await fetch(url)
  let content;
  if (response.ok) {
    content = await response.json();
  }

  // Display the result
  let result = document.querySelector("#result");

  // If previous request was an error, remove the error class
  if (result.classList.contains("error")) {
    result.classList.remove("error");
  }

  // Check if requested stock exists
  // If the current price is 0, then it is essentially non existent
  if (content.c === 0) {
    result.classList.add("error");
    result.textContent = `ERROR: ${input} does not exist`;
  } else {
    result.textContent = `Current Price of ${input} is: $${content.c}`;
  }
}