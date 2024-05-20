import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Generate a random secret key for JWT signing
const secretKey = crypto.randomBytes(32).toString('hex');

/** 
 * Middleware to authenticate JWT tokens.
 * Verifies the token provided in the Authorization header.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
const authenticateJWT = (req, res, next) => {
    console.log('authenticateJWT');
    // Allow registration and login endpoints without authentication
    if (req.path === '/register' || req.path === '/login')
        return next();

    const bearerToken = req.headers.authorization;
    let token = '';

    if (bearerToken)
        token = bearerToken.split(" ")[1];

    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.error('JWT verification error:', err);
                return res.status(403).json({ message: 'Failed to authenticate token' });
            } else {
                console.log(decoded);
                req.user = decoded; // Attach decoded user information to the request object
                next(); // Proceed to the next middleware
            }
        });
    } else {
        console.error('No token provided');
        res.status(401).json({ message: 'No token provided' });
    }
};

/**
 * Generate a JWT token for the provided user object.
 * @param {Object} user - User object
 * @returns {string} - JWT token
 */
const generateToken = (user) => {
    console.log('generateToken');
    const userObject = user.toObject(); // Convert user object to a plain JavaScript object
    const token = jwt.sign(userObject, secretKey, { expiresIn: '1h' }); // Generate a token with 1-hour expiration
    return token;
};

export { authenticateJWT, generateToken };