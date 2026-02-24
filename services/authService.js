const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const ProfilRepository = require('../repositories/profilRepository');

class AuthService {
  static async login(email, password, role) {
    const passwordHash = this.hashPassword(password);
    const user = await userModel.findOne({ email, password: passwordHash, idProfil: { nom: role } });
    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    } 

    return {
        accessToken: this.generateToken(user),
        refreshToken: this.generateRefreshToken(user)
    }
  }

  static async register(email, username, password, role) {
    const passwordHash = await this.hashPassword(password);
    const profil = await ProfilRepository.findByName(role);
    const newUser = new userModel({
        email,
        username,
        password: passwordHash,
        idProfil: profil._id
    });
    await newUser.save();
    return {
            user: newUser,
            accessToken: this.generateToken(newUser),
            refreshToken: this.generateRefreshToken(newUser)
    };
  }

  static async refreshToken(refreshToken) {
        try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRETS);
            const user = await userModel.findById(decoded.userId).populate('idProfil');
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
            return {
                accessToken: this.generateToken(user),
                refreshToken: this.generateRefreshToken(user)
            }
        }
        catch (err) {
            throw new Error('Token de rafraîchissement invalide: ' , err.message);
        }
    }

  static async hashPassword(password) {
    return  await bcrypt.hash(password, 12);
  }

  static async generateToken(user) {
    const accessToken = jwt.sign({ userId: user._id, role: user.idProfil.nom }, process.env.JWT_SECRETS, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
   return accessToken;
  }

  static async generateRefreshToken(user) {
    const refreshToken = jwt.sign({ userId: user._id, role: user.idProfil.nom }, process.env.JWT_REFRESH_SECRETS, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
    return refreshToken;
  }
}

module.exports = AuthService;