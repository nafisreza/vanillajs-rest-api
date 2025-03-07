// Import the 'http' module to create an HTTP server
const http = require('http');

// Import the 'url' module to parse URLs and query parameters
const url = require('url');

// Import the 'handleRoutes' function from the routes module
const { handleRoutes } = require('./routes/index');

// Defining the port on which the server will listen
const PORT = 3000;

// Create an HTTP server
const server = http.createServer((req, res) => {

    // Setting the response header to indicate that the content type will be JSON
    res.setHeader('Content-Type', 'application/json');

    // Parsing URL and query parameters
    const parsedUrl = url.parse(req.url, true);

    // Attaching the query parameters to the request object
    req.query = parsedUrl.query;
    
    // Attaching the path (URL pathname) to the request object
    req.path = parsedUrl.pathname;

    // Collect the request body data
    let body = '';
    
    // Listen for 'data' events, which are emitted when a chunk of the request body is received
    req.on('data', chunk => {

        // Append each chunk of data to the 'body' variable
        body += chunk.toString();
    
    });

    // Listen for the 'end' event, which is emitted when the entire request body has been received
    req.on('end', () => {
        // If there is a body, parse it as JSON and attach it to the request object
        if (body) {
    
            req.body = JSON.parse(body);
    
        }

        // Call the 'handleRoutes' function to handle the request based on the route
        handleRoutes(req, res);
    
    });

});

// Start the server and make it listen on the specified port
server.listen(PORT, () => {
    
    // Log a message to the console indicating that the server is running
    console.log(`Server running on port ${PORT}`);

});