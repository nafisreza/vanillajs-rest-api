// Import the verifyToken function from the JWT utility module

const { verifyToken } = require('../utils/jwt');

// Define the authentication middleware function

const authMiddleware = (req, res, next) => {

    const token = req.headers['authorization'];
    
    if (!token) {
    
        res.statusCode = 401; 

        res.end(JSON.stringify({ error: 'No token provided' })); 

        return; 
    
    }

    try {
        
        const decoded = verifyToken(token.split(' ')[1]);
        
        req.user = decoded;
        
        next();
    
    }
    
    catch (error) {
        
        res.statusCode = 401; 
        
        res.end(JSON.stringify({ error: 'Invalid token' })); 
    
    }
};

// Export the authMiddleware function to be used in other parts of the application

module.exports = authMiddleware;