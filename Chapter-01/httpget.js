const fs = require("fs");
const http = require("https");
const url = "https://en.wikipedia.org/wiki/Charlie_Brown";
const request = http.get(url,
res => {
    let writeStream = fs.createWriteStream("./assets/Charlie_Brown.html")
    res.pipe(writeStream);
    res.on("end",()=>{
        console.log(`${url} downloaded!!!`)
    })
});
request.end();