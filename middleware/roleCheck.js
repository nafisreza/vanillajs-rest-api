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

module.exports = checkRole; 