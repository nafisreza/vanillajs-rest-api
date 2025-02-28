const http = require('http');
const url = require('url');
const { handleRoutes } = require('./routes/index');

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

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
