const fs = require("fs");
const { promises } = require("stream");
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

// readFileWithPromise(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);

//     return writeFileWithPromise(`${__dirname}/dog-image.txt`, res.body.message);
//   })
//   .then(() => {
//     console.log("Successfully written to the file.");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

const getDogImage = async () => {
  try {
    const data = await readFileWithPromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
    const response1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const response2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const response3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const allResponses = await Promise.all([response1, response2, response3]);
    const dogImages = allResponses.map((dogImage) => dogImage.body.message);
    console.log(dogImages);
    await writeFileWithPromise(
      `${__dirname}/dog-image.txt`,
      dogImages.join(`\n`)
    );
    console.log("Successfully written to the file.");
  } catch (err) {
    console.log(err);
  }
  return "2. Ready to Serve";
};

//Now just call this function

//Async functions automatically returns a promise
// console.log("1. Begin to execute ");
// getDogImage().then((x) => {
//   console.log(x);
//   console.log("3. Done executing");
// });

(async () => {
  try {
    console.log("1. Begin to execute ");
    const res = await getDogImage();
    console.log(res);
    console.log("3. Done executing");
  } catch (err) {
    console.log(err);
  }
})();
