const profilModel = require("../models/profilModel");

class ProfilRepository {
    static async findByName(name) {
        return await profilModel.findOne({ nom: name });
    }
    static async create(data) {
        const profil = new Profil(data);
        return await profil.save();
    }
    
      // Récupérer tous les profils
    static async findAll() {
        return await Profil.find();
      }
    
      // Récupérer un profil par ID
     static async findById(id) {
        return await Profil.findById(id);
      }
    
      // Mettre à jour un profil par ID
    static  async update(id, data) {
        return await Profil.findByIdAndUpdate(id, data, { new: true });
      }
    
      // Supprimer un profil par ID
      static async delete(id) {
        return await Profil.findByIdAndDelete(id);
      }
    
}

module.exports = ProfilRepository;