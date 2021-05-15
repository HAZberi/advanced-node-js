//Require Modules
const fs = require("fs");

//--------------- Synchronous/Blocking Read Write -------------//
//Declarations
// const greeting = `Hello World`;
// const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
// const textOut = `This is what we know about the avacado: ${textInput}. \nCreated on ${Date.now()}`;

//Outputs
// console.log(greeting);
// console.log(textInput);
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File Written!");

//-------------- Asynchronous/Non-blocking Read Write ----------//

fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) console.error(err);
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    if (err) console.error(err);
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      if (err) console.error(err);
      console.log(data3);

      fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, "utf-8", (err) => {
        if (err) console.error(err);
        console.log("Data has been written.");
      });
      console.log("Writing to File........");
    });
  });
});
console.log("Reading files........");
