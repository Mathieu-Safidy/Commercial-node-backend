const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const {decode} = require("jsonwebtoken");


const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
   // console.log('Auth', authHeader);
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Aucune autorisation' });
    }
    try {
      //  console.log('Secretes', process.env.JWT_SECRETS)
        const decoded = jwt.verify(token, process.env.JWT_SECRETS);
        // Récupère l'utilisateur (attention : si getUserById est async → il faut await)
     //   console.log(decoded)
        const now = Math.floor(Date.now() / 1000);
        const timeToExpire = decoded.exp - now;
      //  console.log('Time to expire', timeToExpire);

        const user = await userService.getUserById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }
        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Session expired' });
        }
    //   console.error('JWT Error:', err.message);
        return res.status(403).json({ message: 'Token invalide ou expiré' });
    }
};

const restrictedTo = (...roles) => {
    return (req, res, next) => {
        console.log('User restrict ', req.user, roles);
        
        if (!req.user.idProfil.nom.includes(roles)) {
            return res.status(403).json({ message: 'Accès refusé' });   
        }
        next();
    }
}

module.exports = { authMiddleware, restrictedTo };