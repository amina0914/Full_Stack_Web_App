import {key} from "./keys.mjs";
import fetch from 'node-fetch';

/**
 * Export Third party API that returns Stock Information
 * @param {URL} userRequest Queries that the User inputs in Client Side for third party API
 * @returns 
 */
export async function fetchAPI(userRequest) {
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