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
 */
async function getSymbols() {
  let response = await fetch("http://localhost:3000/Symbol")
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
 * @param {event} e 
 */
async function getStock(e) {
  e.preventDefault();

  // Fetch TODO
  let input = document.querySelector("#stock-choice").value;

  let url = `http://localhost:3000/Search?name=${input}`

  let response = await fetch(url)
  let content;
  if (response.ok) {
    content = await response.json();
  }
  let result = document.querySelector("#result");
  
  if (result.classList.contains("error")) {
    result.classList.remove("error");
  }

  if (content.c == 0) {
    result.textContent = `ERROR: ${input} does not exist`;
    result.classList.add("error");
  } else {
    result.textContent = `Current Price of ${input} is: $${content.c}`;
  }
}