const fs = require("fs");
const superagent = require("superagent");

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  if (err) return console.log("File Not Found");
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile(`${__dirname}/dog-image.txt`, res.body.message, (err) => {
        if (err) return console.log("Cannot write to the file");
        console.log("Successfully written to the file.");
      });
    })
    .catch((err) => {
      if (err) return console.log("Cannot find the requested breed");
    });
});
