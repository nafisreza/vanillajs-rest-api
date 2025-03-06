const { verifyToken } = require('../utils/jwt');

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

module.exports = authMiddleware; 