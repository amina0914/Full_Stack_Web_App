/**
 * This is the module that exports a function fetching data from an API.
 * It imports the key (which is a personal key to the api) from a module that 
 * ensures protection of the key from the user.
 * @Date: 02-11-2022
 * @Author: Amina Turdalieva
 * */
import {key} from "./keys.mjs";
import fetch from 'node-fetch';

/**
 * Export Third party API that returns Stock Information
 * @param {URL} userRequest Queries that the User inputs in Client Side for third party API
 * @returns JSON data
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