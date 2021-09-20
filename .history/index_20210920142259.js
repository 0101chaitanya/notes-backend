const http = require('http');

const app = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Hello, world!");
});

const PORT