"use strict"
const fsp = require('fs/promises');

/** Reads file at the given path and prints the contents of the file */
async function cat(path) {
  try{
    let contents = await fsp.readFile(path, "utf8");
    console.log(contents);
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}

cat(process.argv[2]);