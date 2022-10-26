/**
 * This is a module exports a singleton object/class that reads from the file contents
 * and returns the array of symbols 
 * @Date: 
 * @Author:
 * */


import { validate, read } from "../fileio/fileio.mjs";

export let singleton = function (){
  let symbolsArray; 
  function SingletonClass(){
    let file = '../files/basicNasdaq.json';
    validate(file);
    symbolsArray = read(file);
  }

  var instance; 

  return {
    getInstance: function(){
      if (!instance){
        instance = new SingletonClass();
        delete instance.constructor;
      }
      return instance;
    }
  }
}

