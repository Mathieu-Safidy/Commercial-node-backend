const AuthController = require('../controllers/authController')
const router = require('express').Router()


router.post('/refresh-token', AuthController.refreshToken)
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Bienvenue sur la route d\'authentification' });
})

module.exports = router