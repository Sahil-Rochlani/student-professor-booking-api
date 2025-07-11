const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

// Middleware to check if the user is authenticated via JWT token
const authenticate = (req, res, next) => {
    try{
        const token = req.cookies.token
        if (!token) {
            // No token found in cookies
            return res.status(401).json({ message: 'No token provided' });
        
        }

        // Verify the JWT token
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded      //Modify the request object
        next()
    }
    catch(err){
        // Token is invalid or expired
        return res.status(401).json({message: 'Invalid or expired token'})
    }
    
}

module.exports = authenticate