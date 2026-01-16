const http =  require("http");
const fs = require("fs");
const path = require("path");

const hostname = '127.0.0.1';
const port = 3000;
const filePath = path.join(__dirname, 'output.txt');


const server = http.createServer((req, res) => {
    if(req.url === '/write') {
        const data = 'Hello, this is a sample text written to the file.\n';
        fs.appendFile(filePath, data, (err) => {
            if(err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end("Error writing to file");
            } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end("File written successfully");
            }
        })
    } else if (req.url === '/read') {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if(err){
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end("Error reading file");
            } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(data);
            }
        })
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end("Not Found");
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});