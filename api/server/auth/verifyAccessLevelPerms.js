const accessLevelPerms = require('./accessLevelPerms'); 

const verifyAccessLevelPerms = (minRole) => (req, res, next) => {
    const { role } = req.authorization;

    if(accessLevelPerms[role].value >= accessLevelPerms[minRole].value) {
        next(); 
    }
    else {
        res.status(401).json({ message: 'Permission denied.', err: `Permission denied (minRequired: ${minRole})` });
    }
};

module.exports = verifyAccessLevelPerms;