"use strict";

document.addEventListener('DOMContentLoaded', setup)

const submitBtn = document.querySelector("button");
submitBtn.addEventListener("click", fetch2);

function setup() {
  fetch1()
}

/**
 * First Fetch to obtain the list of all symbols
 */
async function fetch1() {
  // Fetch TODO
}

/**
 * Second Fetch, executed only after pressing the submit button
 * @param {event} e 
 */
async function fetch2(e) {
  // Fetch TODO

  let input = document.querySelector("#stock-choice").value;

  let result = document.querySelector("#result");
  result.textContent = `Current Price of ${input}: `;

  e.preventDefault();
}