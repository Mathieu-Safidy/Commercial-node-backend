const AuthService = require("../services/authService");

class AuthController {
    static async login(req, res) {
        try {
            const { email, password, role = 'User' } = req.body;
            const tokens = await AuthService.login(email, password, role);
            res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true, secure: process.env.NODE_ENV ? (process.env.NODE_ENV === 'production') : true, sameSite: 'lax' });
            res.status(200).json({accessToken: tokens.accessToken, user: tokens.user});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } 

    static async register(req, res) {
        try {
            const { email, username, password, role = 'Boutique' } = req.body;
            const newUser = await AuthService.register(email, username, password, role);
            res.cookie("refreshToken", newUser.refreshToken, { httpOnly: true, secure: process.env.NODE_ENV ? (process.env.NODE_ENV === 'production') : true, sameSite: 'lax' });
            res.status(201).json({user: newUser.user, accessToken: newUser.accessToken});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            const newTokens = await AuthService.refreshToken(refreshToken);
            res.cookie("refreshToken", newTokens.refreshToken, { httpOnly: true, secure: process.env.NODE_ENV ? (process.env.NODE_ENV === 'production') : true, sameSite: 'lax' });
            res.status(200).json(newTokens);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = AuthController;