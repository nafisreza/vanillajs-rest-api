// Define the checkRole middleware function

const checkRole = (role) => {

    return (req, res, next) => {

        if (req.user.role !== role) {

            res.statusCode = 403; 

            res.end(JSON.stringify({ error: 'Unauthorized access' })); 
            
            return; 
 
        }
        
        next();
    
    };

};

// Export the checkRole function to be used in other parts of the application

module.exports = checkRole;