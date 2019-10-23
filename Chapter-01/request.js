const fs = require("fs");
const http = require("https");

const options = {
    hostname: "en.wikipedia.org",
    port: 443,
    path: "/wiki/Snoopy",
    method: "GET"
}

const request = http.request(options, res => {

    let responseDate = "";

    res.setEncoding("UTF-8");
    res.on("data",data =>{
        console.log("_____Received Data_____"+`${data.length}`+"__size___");
        responseDate += data;
    });
    res.on("end",()=>{
        fs.writeFile("./assets/Snoopy.html",responseDate,err=>{
            if(err){
                throw err;
            }
        })
    });
});
request.end();