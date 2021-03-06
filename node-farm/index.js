//Require Modules
const fs = require("fs");
const http = require("http");

const slugify = require("slugify");

const injectDataInTemplate = require("./modules/replaceTemplate");
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

//Creating slugs for existing data

//Creating slugs from product name
const slugs = productData.map((product) =>
  slugify(product.productName, { lower: true })
);

//Adding slugs to existing data
const slugifyedData = productData.map((product) => {
  if (product.id || product.id === 0) {
    product.slug = slugs[product.id];
  } else {
    console.log("Error!! Cannot find product id.");
  }
  return product;
});

const server = http.createServer((req, res) => {
  const { pathname, searchParams } = new URL(req.url, "http://localhost:7500");
  //Overview of products
  if (pathname === "/" || pathname === "/overview") {
    const cardsHtml = slugifyedData
      .map((product) => injectDataInTemplate(cardUI, product))
      .join("");
    const overviewPage = overviewUI.replace(`{%INJECTCARDS%}`, cardsHtml);

    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(overviewPage);

  //Products Page
  } else if (pathname.includes("/product")) {
    const product = slugifyedData[searchParams.get("id")];
    const productPage = injectDataInTemplate(productUI, product);

    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(productPage);

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
