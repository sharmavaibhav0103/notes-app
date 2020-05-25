const config = require('config');

const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    var token = req.header('Authorization');
    if(!token) return res.status(401).send({ msg: 'Access Forbidden!' });
    token = token.split(' ');
    token = token[1];
    console.log(token);

    try {
        const decodedUser = await jwt.verify(token,config.get('jwtSecret'));
        req.user = decodedUser;
        req.token = token;
    }
    catch(err){
        res.status(500).json({ 'err': err.message });
    }
    next();
}

module.exports = verifyToken;