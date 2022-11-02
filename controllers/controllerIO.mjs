/**
 * This is a module exports a singleton object/class that validates a file and reads it
 * returning an array of symbols from the file
 * @Date: 02-22-2022
 * @Author: Amina Turdalieva 
 * */
import { validate, read } from "../fileio/fileio.mjs";

let instance;
export class Singleton {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }
  async getInstance() {
    if (instance.data) {
      return instance.data
    }
    let file = './files/basicNasdaq.json';
    validate(file);
    // fills the symbolsArray with the data read from the provided file and returns it
    let symbolsArray = await read(file);
    instance = { "data": {symbolsArray} }
    return instance.data
  }
}