const AuthController = require('../controllers/authController');

const ProductController = require('../controllers/productController');

const OrderController = require('../controllers/orderController');

const authMiddleware = require('../middleware/auth');

const checkRole = require('../middleware/roleCheck');

const routes = {

    'POST:/register': AuthController.register,
    'POST:/login': AuthController.login,
    'POST:/logout': [authMiddleware, AuthController.logout],
    
    'GET:/products': ProductController.getAll,
    'GET:/products/:id': ProductController.getById,

    'POST:/products': [authMiddleware, checkRole('admin'), ProductController.create],
    
    'PATCH:/products/:id': [authMiddleware, checkRole('admin'), ProductController.update],
    
    'DELETE:/products/:id': [authMiddleware, checkRole('admin'), ProductController.delete],
    
    'POST:/orders': [authMiddleware, OrderController.create],
    'GET:/orders/:id': [authMiddleware, OrderController.getById],
    'PATCH:/orders/:id': [authMiddleware, checkRole('admin'), OrderController.update],
    'DELETE:/orders/:id': [authMiddleware, checkRole('admin'), OrderController.delete],
    'GET:/orders': [authMiddleware, OrderController.getAllByUser]
};

const handleRoutes = async (req, res) => {

    const method = req.method;
    
    // Extract path segments
    const pathSegments = req.path.split('/');
    
    // Replace the last segment with :id if it matches a UUID pattern
    
    if (pathSegments.length > 2 && pathSegments[2].match(/^[a-f0-9-]+$/i)) {
    
        // Store the ID parameter for controllers
    
        req.params = {
    
            id: pathSegments[2]
    
        };
    
        // Replace the UUID with :id for route matching
    
        pathSegments[2] = ':id';
    
    }
    
    // Reconstruct the path
    
    const routePath = pathSegments.join('/');
    
    const route = `${method}:${routePath}`;
    
    const handler = routes[route];
    
    if (!handler) {
    
        res.statusCode = 404;
    
        res.end(JSON.stringify({error: 'Route not found',requestedPath: req.path,method: method,routeAttempted: route}));

        return;
    
    }

    if (Array.isArray(handler)) {
    
        // Handle middleware chain
    
        let index = 0;
    
        const next = async () => {
    
            if (index < handler.length) {
    
                await handler[index++](req, res, next);
    
            }
    
        };
    
        await next();
    
    } 
    
    else {
    
        await handler(req, res);
    
    }

};

module.exports = { handleRoutes };