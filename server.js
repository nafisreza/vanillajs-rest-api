const http = require('http');

const url = require('url');

const { handleRoutes } = require('./routes/index');

const PORT = 3000;

const server =http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})