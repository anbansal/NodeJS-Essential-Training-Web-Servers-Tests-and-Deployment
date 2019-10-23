const {createServer } = require("http");
const {createReadStream} = require("fs");

const sendFile = (res, status, type, filePath) => {
    res.writeHead(status, { "Content-Type": type });
    createReadStream(filePath).pipe(res);
};

createServer((req, res) => {
    switch (req.url) {
        case "/":
            return sendFile(res, 200, "text/html", "./assets/home-page.html");
        case "/fileServer/styles.css":
            return sendFile(res, 200, "text/css", "./assets/fileServer/styles.css");
        case "/fileServer/ankur_bansal.jpg":
            return sendFile(res, 200, "image/jpeg", "./assets/fileServer/ankur_bansal.jpg");
        default:
            return sendFile(res, 200, "text/html", "./assets/404.html");
    }
}).listen(3000);
console.log("listening on port 3000");