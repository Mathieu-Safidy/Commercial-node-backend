const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const ProfilRepository = require('../repositories/profilRepository');

class AuthService {
  static async login(email, password, role) {
    // const passwordHash = await this.hashPassword(password);
    const profil = await ProfilRepository.findByName(role);
    console.log('profil ', profil);
    const user = await userModel.findOne({ email, idProfil: profil._id }).populate('idProfil');
    console.log('User found: ', user);
    const isPasswordValid = user ? await this.comparePassword(password, user.password) : false;
    console.log('Password valid: ', isPasswordValid);
      console.log(user, isPasswordValid)
    if (!user || !isPasswordValid) {
      throw new Error('Email ou mot de passe incorrect');
    } 
    const token = await this.generateToken(user)
    const refreshToken = await this.generateRefreshToken(user)
    return {
        accessToken: token,
        refreshToken: refreshToken,
        user: user
    }
  }

  static async logout() {
    // Invalidate the refresh token (implementation depends on how you store tokens)
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
    const populatedUser = await userModel.findOne({ _id: newUser._id }).populate('idProfil');
    return {
            user: populatedUser,
            accessToken: await this.generateToken(populatedUser),
            refreshToken: await this.generateRefreshToken(populatedUser)
    };
  }

  static async refreshToken(refreshToken) {
        try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRETS);
        console.log("decode ", decoded);
        
            const user = await userModel.findById(decoded.userId).populate('idProfil');
            console.log('User', user);
            
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
            return {
                accessToken: await this.generateToken(user),
                refreshToken: await this.generateRefreshToken(user),
                user: user
            }
        }
        catch (err) {
            throw new Error('Token de rafraîchissement invalide: ' , err.message);
        }
    }

  static async hashPassword(password) {
    return  await bcrypt.hash(password, 12);
  }

  static async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
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