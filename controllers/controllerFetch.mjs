import {key} from "./keys.mjs";
import fetch from 'node-fetch';

async function fetchAPI(userRequest) {
  let data;
  let dataResponse;
  let URI = new URL("https://finnhub.io/api/v1/quote");
  URI.search = `?symbol=${userRequest}&token=${key.key}`;
  try {
    dataResponse = await fetch(URI.href);
    if(!dataResponse.ok){
      throw Error(dataResponse.statusText);
    }
    data = await dataResponse.json();
  } catch(err) {
    console.error("The following error occured: " + err);
  }
  return data;
}


// Using this function for testing purposes 
async function yo() {
  let result = await fetchAPI('AAPL')
  console.log(result);
}
  
yo() 