const jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token: ', token);
    if (token === null) return res.status(401).json({ error: false, message: 'Unauthorized' });

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return res.status(403).json({error: false, message: 'Unauthorized' });
        req.user = user;
        next();
    }
    );
}

module.exports = authenticateJWT;