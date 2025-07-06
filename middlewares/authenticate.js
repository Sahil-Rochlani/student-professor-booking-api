const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

const authenticate = (req, res, next) => {
    try{
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        
        }
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    }
    catch(err){
        return res.status(401).json({message: 'Invalid or expired token'})
    }
    
}

module.exports = authenticate