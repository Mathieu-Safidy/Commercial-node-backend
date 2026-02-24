const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Aucune autorisation' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Récupère l'utilisateur (attention : si getUserById est async → il faut await)
        const user = await userService.getUserById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error('JWT Error:', err.message);
        return res.status(403).json({ message: 'Token invalide ou expiré' });
    }
};

const restrictedTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.idProfil.nom)) {
            return res.status(403).json({ message: 'Accès refusé' });   
        }
        next();
    }
}

module.exports = { authMiddleware, restrictedTo };