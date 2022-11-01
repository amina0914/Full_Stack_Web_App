/**
 * This is a module that exports a function that reads a file information and returns it
 * @Date: 
 * @Author: Amina
 * */
import * as fs from "fs/promises";

/**
 * Validate File Path
 * @param {File} file File Object
 */
export async function validate(file) {
  try {
    // await fs.access(path);
    let stats = await fs.stat(file);
    console.log("File is valid!");
    return stats.isFile();
  } catch (e) {
    console.error("Error occured, file not valid: " + e);
    throw e;
  }
}

/**
 * Read data from file and return as JSON array
 * @param {File} file File Object
 * @returns JSON array
 */
export async function read(file) {
  try {
    let data = await fs.readFile(file, "utf-8");
    console.log("File read");
    return JSON.parse(data);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}


