/**
 * This is a module that exports a function that reads a file information and returns it
 * @Date: 02-11-2022
 * @Author: Amina Turdalieva
 * */
import * as fs from "fs/promises";

/**
 * Validates File Path
 * First checks if the file has the right permissions, then checks if it is indeed a file
 * @param {File} file File Object
 */
export async function validate(file) {
  try {  
    let valid = await exists(file);
    let stats;
    if (valid) {
      stats = await fs.stat(file);
    }
    return stats.isFile();
   
  } catch (e) {
    console.error("Error occured, file not valid: " + e);
    throw e;
  }
}

/**
 * Checks if the file exists and has the permissions
 * @param {Path} path Path Object which represents the path to the file to read
 * @returns JSON array
 */
async function exists (path) {  
  try {
    await fs.access(path);
    return true;
  } catch (e) {
    return false;
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
    return JSON.parse(data);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}


