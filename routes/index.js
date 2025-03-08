// Import controllers and middleware

// Handles authentication-related logic
const AuthController = require('../controllers/authController'); 

// Handles product-related logic
const ProductController = require('../controllers/productController'); 

// Handles order-related logic
const OrderController = require('../controllers/orderController'); 

// Middleware to authenticate users
const authMiddleware = require('../middleware/auth'); 

// Middleware to check user roles
const checkRole = require('../middleware/roleCheck'); 

// Define routes and map them to their respective controllers and middleware

const routes = {

    // Authentication routes

    'POST:/register': AuthController.register, // Route for user registration
    'POST:/login': AuthController.login, // Route for user login

    // Product routes

    'GET:/products': ProductController.getAll, // Route to get all products
    'GET:/products/:id': ProductController.getById, // Route to get a specific product by ID

    // Admin-only product routes (protected by authMiddleware and roleCheck)

    'POST:/products': [authMiddleware, checkRole('admin'), ProductController.create], // Route to create a new product
    'PATCH:/products/:id': [authMiddleware, checkRole('admin'), ProductController.update], // Route to update a product
    'DELETE:/products/:id': [authMiddleware, checkRole('admin'), ProductController.delete], // Route to delete a product

    // Order routes

    'POST:/orders': [authMiddleware, OrderController.create], // Route to create a new order (protected by authMiddleware)
    'GET:/orders/:id': [authMiddleware, OrderController.getById], // Route to get a specific order by ID (protected by authMiddleware)
    'PATCH:/orders/:id': [authMiddleware, checkRole('admin'), OrderController.update], // Route to update an order (admin-only)
    'DELETE:/orders/:id': [authMiddleware, checkRole('admin'), OrderController.delete] // Route to delete an order (admin-only)

};

// Function to handle incoming requests and route them to the appropriate handler

const handleRoutes = async (req, res) => {

    const method = req.method; // Extract the HTTP method (e.g., GET, POST)

    // Extract path segments from the request URL

    const pathSegments = req.path.split('/');

    // Check if the last segment is a UUID (e.g., product or order ID)

    if (pathSegments.length > 2 && pathSegments[2].match(/^[a-f0-9-]+$/i)) {

        // Store the ID parameter in req.params for use in controllers

        req.params = {
            id: pathSegments[2]
        };

        // Replace the UUID with :id for route matching

        pathSegments[2] = ':id';

    }

    // Reconstruct the path for route matching

    const routePath = pathSegments.join('/');

    // Create the route key by combining the method and path (e.g., "GET:/products/:id")

    const route = `${method}:${routePath}`;

    // Get the handler (controller or middleware chain) for the route

    const handler = routes[route];

    // If no handler is found, return a 404 error

    if (!handler) {

        res.statusCode = 404;

        res.end(JSON.stringify({
            error: 'Route not found',
            requestedPath: req.path,
            method: method,
            routeAttempted: route
        }));

        return;

    }

    // If the handler is an array, it means there are middleware functions to execute

    if (Array.isArray(handler)) {

        let index = 0; // Index to track the current middleware/controller in the chain

        // Define the next function to move to the next middleware/controller in the chain

        const next = async () => {

            if (index < handler.length) {

                await handler[index++](req, res, next); // Execute the current middleware/controller

            }

        };

        // Start the middleware chain

        await next();

    } 
    else {

        // If the handler is a single function, execute it directly

        await handler(req, res);

    }

};

// Export the handleRoutes function to be used in the main server file

module.exports = { handleRoutes };