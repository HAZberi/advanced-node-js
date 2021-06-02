//Require Modules
const fs = require("fs");
const http = require("http");
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

// fs.readFile("./txt/start9.txt", "utf-8", (err, data1) => {
//   if (err) return console.log(err);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     if (err) console.error(err);
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       if (err) console.error(err);
//       console.log(data3);
//       fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, "utf-8", (err) => {
//         if (err) console.error(err);
//         console.log("Data has been written.");
//       });
//       console.log("Writing to File........");
//     });
//   });
// });
// console.log("Reading files........");

//-------------- A Basic Node Server -------------------//

// const server = http.createServer((req, res) => {
//   res.end("Hello world from my web server");
// });

// server.listen(7000, "127.0.0.1", () => {
//   console.log("Listening to requests on port 7000");
// });

//------------- A Basic Node Server with Basic Routing -------------//
const replaceWithTemplate = (ui, data) => {
  let output = ui.replaceAll(`{%PRODUCTNAME%}`, data.productName);
  output = output.replaceAll(`{%IMAGE%}`, data.image);
  output = output.replaceAll(`{%PRODUCTORIGIN%}`, data.from);
  output = output.replaceAll(`{%NUTRIENTS%}`, data.nutrients);
  output = output.replaceAll(`{%QUANTITY%}`, data.quantity);
  output = output.replaceAll(`{%PRICE%}`, data.price);
  output = output.replaceAll(`{%DESCRIPTION%}`, data.description);
  output = output.replaceAll(`{%NON-ORGANIC%}`, "not-organic");
  output = output.replaceAll(`{%ID%}`, data.id);

  return output;
};

//Read the templates only one time
const cardUI = fs.readFileSync(
  `${__dirname}/templates/card-template.html`,
  "utf-8"
);
const overviewUI = fs.readFileSync(
  `${__dirname}/templates/overview-template.html`,
  "utf-8"
);
const productUI = fs.readFileSync(
  `${__dirname}/templates/product-template.html`,
  "utf-8"
);

//Read the product data only one time
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathname = req.url;
  //Overview of products
  if (pathname === "/" || pathname === "/overview") {
    const cardsHtml = productData.map((product) =>
      replaceWithTemplate(cardUI, product)
    );

    console.log(cardsHtml);

    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(overviewUI);

    //Products Page
  } else if (pathname === "/product") {
    res.end("Products Page");

    //API Page
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    //Page Not Found Page
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-response-header": "Naita Jee",
    });
    res.end("<h1>Page Not Found</h1>");
  }
});

server.listen(7500, "127.0.0.1", () => {
  console.log("Listening to requests on port 7500");
});
