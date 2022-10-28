/**
 * This is a module exports a singleton object/class that reads from the file contents
 * and returns the array of symbols 
 * @Date: 
 * @Author:
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
    let file = '../files/basicNasdaq.json';
    validate(file);
    let symbolsArray = await read(file);
    instance = { "data": {symbolsArray} }
    return instance.data
  }
}


// // This following method is to test the Singleton, thats how to call it from another class 
// async function yo() {
//   let single = new Singleton();
//   let data = await single.getInstance();
//   console.log(data);
// }
    
// yo() 