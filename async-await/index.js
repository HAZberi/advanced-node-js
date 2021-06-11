const fs = require("fs");
const superagent = require("superagent");

const readFileWithPromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("Cannot find the requested File");
      resolve(data);
    });
  });
};

const writeFileWithPromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Unable to write the file");
      resolve("File Written");
    });
  });
};

//Always remember to return a promise, so it can be chained using 
// the ".then()" method.


readFileWithPromise(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);

    return writeFileWithPromise(
      `${__dirname}/dog-image.txt`,
      res.body.message
    ).then(() => {
      console.log("Successfully written to the file.");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
