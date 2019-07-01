const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, next) => {
    const {token} = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.authId = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Auth failed",
            err: err
        });
    }
};

module.exports = verifyAuth;