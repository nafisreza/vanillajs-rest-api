// Import the 'http' module to create an HTTP server
const http = require('http');

// Import the 'url' module to parse URLs and query parameters
const url = require('url');

// Import the 'handleRoutes' function from the routes module
const { handleRoutes } = require('./routes/index');

// Defining the port on which the server will listen
const PORT = 3000

// Create an HTTP server
const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    const parsedUrl = url.parse(req.url, true);

    req.query = parsedUrl.query;
    
    req.path = parsedUrl.pathname;

    let body = '';
    
    req.on('data', chunk => {

        body += chunk.toString();
    
    });
    
    req.on('end', () => {
        
        if (body) {
    
            req.body = JSON.parse(body);
    
        }

        handleRoutes(req, res);
    
    });

});

// Start the server and make it listen on the specified port

server.listen(PORT, () => {
    
    console.log(`Server running on port ${PORT}`);

});