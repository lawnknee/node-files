"use strict";

const fsp = require("fs/promises");
const axios = require("axios");

/** Reads file at the given path and
 * prints the contents of the file
 * */

async function cat(path) {
  try {
    let contents = await fsp.readFile(path, "utf8");
    console.log(contents);
  } catch (error) {
    console.log(`Error reading ${path}: ${error}`);
    process.exit(1);
  }
}

/** Reads the contents at the given URL and
 * prints the contents to the console.
 * */

async function webCat(URL) {
  try {
    let contents = await axios.get(`${URL}`);
    console.log(contents.data);
  } catch (error) {
    console.log(`Error fetching ${URL}: ${error}`);
    process.exit(1);
  }
}

async function catOrWebWrite(outputPath, readfileOrUrl) {
  // if statement: url
  if (readfileOrUrl.includes("http")) {
    // if true
    //      contents = axios request, fsp.writefile (path, contents)
    try {
      let contents = await axios.get(`${readfileOrUrl}`);
      await fsp.writeFile(outputPath, contents.data, "utf8");
    } catch (error) {
      console.log(`Error fetching ${URL}: ${error}`);
      process.exit(1);
    }
  } else {
    try {
      let contents = await fsp.readFile(readfileOrUrl, "utf8");
      await fsp.writeFile(outputPath, contents, "utf8");
    } catch (error) {
      console.log(`Error fetching ${URL}: ${error}`);
      process.exit(1);
    }
  }
}

if (process.argv[2] === "--out") {
  catOrWebWrite(process.argv[3], process.argv[4]);
} else if (process.argv[2].includes("http")) {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2]);
}
