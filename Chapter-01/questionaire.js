const { createServer } = require("http");
const fs = require("fs");

const { decode } = require("querystring")

const sendFile = (res, status, type, filePath) => {
    res.writeHead(status, { "Content-Type": type });
    fs.createReadStream(filePath).pipe(res);
};
const questions = [
    "What is your name? ",
    "How are you? ",
    "What did you do today? ",
    "What is your favourite color? ",
    "What is your hobby? ",
    "Where are you coming from? ",
    "Where are you going? ",
    "What is your background? "
];
createServer((req, res) => {
    if (req.method === "POST") {
        let body = "";
        req.on("data", data => {
            body += data;
        });
        req.on("end", () => {
            const { name,q2,q3,q4,q5,q6,q7,q8, email, phoneNo, message } = decode(body);
            const text = `\nA New submission of Answers for you!!!
            From: ${ name}
            ------------Answers--------------------------
            ${questions[1]}: ${q2}    
            ${questions[2]}: ${q3}    
            ${questions[3]}: ${q4}    
            ${questions[4]}: ${q5}    
            ${questions[5]}: ${q6}    
            ${questions[6]}: ${q7}    
            ${questions[7]}: ${q8}\n
            Email Id: ${ email}
            Phone No. ${ phoneNo}
            Message: ${ message}
            =============================================== \n`
            fs.appendFile("messeges.txt", text, err => { if (err) throw err; })

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
            return sendFile(res, 200, "text/html", "./assets/questions.html");
        case "/questions.html":
            return sendFile(res, 200, "text/html", "./assets/questions.html");
        default:
            return sendFile(res, 200, "text/html", "./assets/404.html");
    }
}).listen(3000);
console.log("listening on port 3000");