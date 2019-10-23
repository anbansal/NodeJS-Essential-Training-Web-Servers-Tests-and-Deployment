const http = require("http");

http.createServer((req,res) =>{
    res.writeHead(200,{
        "content":"text/plain"
    });
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
        <title> HELLO WORLD</title>
        </head>
        <body>
            <h1> Hello World</h1>
            <p> ${req.url}</p>
            <p> ${req.method}</p>
        </body>
        </html>
    
    
    `);
}).listen(3000);
console.log("webserver listening on port 3000")