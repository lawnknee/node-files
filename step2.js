"use strict"

const fsp = require('fs/promises');
const axios = require('axios');

/** Reads file at the given path and prints the contents of the file */
async function cat(path) {
  try{
    let contents = await fsp.readFile(path, "utf8");
    console.log(contents);
  } catch(error) {
    console.log(`Error reading ${path}: ${error}`);
    process.exit(1);
  }
}

/** Reads the contents at the given URL and prints it to the console. */
async function webCat(URL) {
  try{
    let contents = await axios.get(`${URL}`);
    console.log(contents.data.slice(0,80), "...");
  } catch(error) {
  console.log(`Error fetching ${URL}: ${error}`);
  process.exit(1);
  }
}

process.argv[2].includes('http') ? webCat(process.argv[2]) : cat(process.argv[2]);