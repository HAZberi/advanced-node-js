const fs = require('fs');
const server = require('http').createServer();

server.on("request", (req, res) => {
    //Solution 1 using streams
    fs.readFile("test-file.txt", (err, data) => {
        if(err) console.log(err);
        res.end(data);
    })
    //A basic solution but not suitable for large datasets
    //It would require Node to load the entire file first in the memory
    // and then send the response. So there is high possiblty that Node
    //processes run out of resources.
})

server.listen(5000, "127.0.0.1", ()=>{
    console.log("Listening to requests on port 5000");
})