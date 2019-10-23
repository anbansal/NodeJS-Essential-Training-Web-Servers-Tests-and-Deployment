const { createServer } = require("http");
const fs = require("fs");

const {decode} = require("querystring")

const sendFile = (res, status, type, filePath) => {
    res.writeHead(status, { "Content-Type": type });
    fs.createReadStream(filePath).pipe(res);
};

createServer((req, res) => {
    if(req.method === "POST"){
        let body = "";
        req.on("data",data=>{
            body += data;
        });
        req.on("end",()=>{
            const { name, email, phoneNo,message} = decode(body);
            const text = `\nA New Message for you!!!
            From: ${ name }
            Email Id: ${ email }
            Phone No. ${ phoneNo }
            Message: ${ message }
            ============================ \n`
            console.log(text);
            
        });
    }
    switch (req.url) {
        case "/":
            return sendFile(res, 200, "text/html", "./assets/home-pageNew.html");
        case "/fileServer/styles.css":
            return sendFile(res, 200, "text/css", "./assets/fileServer/styles.css");
        case "/fileServer/ankur_bansal.jpg":
            return sendFile(res, 200, "image/jpeg", "./assets/fileServer/ankur_bansal.jpg");
        case "/contact.html":
            return sendFile(res, 200, "text/html", "./assets/contact.html");
        default:
            return sendFile(res, 200, "text/html", "./assets/404.html");
    }
}).listen(3000);
console.log("listening on port 3000");