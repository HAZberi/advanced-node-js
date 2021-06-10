const fs = require('fs');
const server = require('http').createServer();

server.on("request", (req, res) => {
    //Solution 1 using basic read
    // fs.readFile("test-file.txt", (err, data) => {
    //     if(err) console.log(err);
    //     res.end(data);
    // })
    //A basic solution but not suitable for large datasets
    //It would require Node to load the entire file first in the memory
    // and then send the response. So there is high possiblty that Node
    //processes run out of resources.

    //Solution 2 using streams
    const readableStream = fs.createReadStream('test-file.txt');
    readableStream.on('data', dataChunk => {
        res.write(dataChunk);
    })
    readableStream.on('end', ()=>{
        res.end();
    })
    readableStream.on('error', err => {
        console.log(err);
        res.statusCode = 500;
        res.end("File Not Found");
    })
    //The problem with this approach is that readable stream is much more
    //faster than response stream over the network and it can
    //potentially overwhelm the response stream which cannot handle all this
    //incoming data so fast. This problem is called back pressure. 
})

server.listen(5000, "127.0.0.1", ()=>{
    console.log("Listening to requests on port 5000");
})