const jwt = require('jsonwebtoken');

const verifyAuthentication = (req, res, next) => {
    const { authorization } = req.headers;
    
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.authorization = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Auth failed', err: err });
    }
};

module.exports = verifyAuthentication;