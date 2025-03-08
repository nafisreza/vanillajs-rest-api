// Import the verifyToken function from the JWT utility module
const { verifyToken } = require('../utils/jwt');

// Define the authentication middleware function
const authMiddleware = (req, res, next) => {

    // Extract the token from the 'Authorization' header in the request
    
    const token = req.headers['authorization'];

    // If no token is provided, return a 401 Unauthorized error
    
    if (!token) {
    
        // Set HTTP status code to 401 (Unauthorized)
        res.statusCode = 401; 
        // Send error response
        res.end(JSON.stringify({ error: 'No token provided' })); 
        // Stop further execution
        return; 
    
    }

    try {
        // Verify the token and decode its payload
        
        // The token is typically in the format "Bearer <token>", so we split it and take the second part
        
        const decoded = verifyToken(token.split(' ')[1]);

        // Attach the decoded user information to the request object for use in subsequent middleware or controllers
        
        req.user = decoded;

        // Call the next middleware or route handler in the chain
        
        next();
    
    }
    
    catch (error) {
        
        // If token verification fails, return a 401 Unauthorized error
        
        // Set HTTP status code to 401 (Unauthorized)
        res.statusCode = 401; 
        
        // Send error response
        res.end(JSON.stringify({ error: 'Invalid token' })); 
    
    }
};

// Export the authMiddleware function to be used in other parts of the application

module.exports = authMiddleware;