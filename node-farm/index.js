//Require Modules
const fs = require("fs");

//Declarations
const greeting = `Hello World`;
const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
const textOut = `This is what we know about the avacado: ${textInput}. \nCreated on ${Date.now()}`;

//Outputs
console.log(greeting);
console.log(textInput);
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File Written!");
