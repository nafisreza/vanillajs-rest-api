// Define the checkRole middleware function

// It takes a role as an argument and returns a middleware function

const checkRole = (role) => {

    return (req, res, next) => {

        // Check if the user's role (from req.user) matches the required role

        if (req.user.role !== role) {

            // If the roles don't match, return a 403 Forbidden error

            // Set HTTP status code to 403 (Forbidden)
            res.statusCode = 403; 

            // Send error response
            res.end(JSON.stringify({ error: 'Unauthorized access' })); 
 
            // Stop further execution
            return; 
 
        }

        // If the user's role matches the required role, call the next middleware or route handler
        
        next();
    
    };

};

// Export the checkRole function to be used in other parts of the application

module.exports = checkRole;