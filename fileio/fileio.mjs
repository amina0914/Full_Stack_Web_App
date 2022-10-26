/**
 * This is a module that exports a function that reads a file information and returns it
 * @Date: 
 * @Author:
 * */
const fs = require("fs/promises");

//Not sure if need to validate the file
export async function validate (file){
  try {
    let stats = await fs.stat(file);
    console.log("File is valid!");
    return stats.isFile();
  } catch (e) {
    console.error("Error occured, file not valid: " + e);
    throw e;
  }
}

// This function reads data from a file and returns it as an array
export async function read(file) {
  try {
    let data = await fs.readFile(file, "utf-8");
    console.log("File read");
    return JSON.parse(data).sort();
  } catch (err) {
    console.error(err.message);
    throw e;
  }
}

