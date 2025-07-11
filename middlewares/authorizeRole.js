
// Middleware to check if the user has the required role
const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        // Proceed if the user has the required role
        if(allowedRoles.includes(req.user.role)) return next()

        // Otherwise, deny access
        return res.status(403).json({message: 'Access denied'})
    }
}

module.exports = authorizeRole