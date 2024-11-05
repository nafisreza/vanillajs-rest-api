const http = require('http');
const url = require('url');
const { handleRoutes } = require('./routes/index');

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    // Parse URL and query parameters
    const parsedUrl = url.parse(req.url, true);
    req.query = parsedUrl.query;
    req.path = parsedUrl.pathname;

    // Collect request body
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        if(body) {
            req.body = JSON.parse(body);
        }
        handleRoutes(req, res);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});