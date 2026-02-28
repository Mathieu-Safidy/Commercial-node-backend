const profilRepository = require('../repositories/profilRepository');

class ProfilService {
  async createProfil(data) {
    if (!data.nom) {
      throw new Error('Le nom du profil est requis');
    }
    return await profilRepository.create(data);
  }

  async getAllProfils() {
    return await profilRepository.findAll();
  }

  async getProfilById(id) {
    const profil = await profilRepository.findById(id);
    if (!profil) {
      throw new Error('Profil introuvable');
    }
    return profil;
  }

  async updateProfil(id, data) {
    const profil = await profilRepository.update(id, data);
    if (!profil) {
      throw new Error('Impossible de mettre à jour le profil');
    }
    return profil;
  }

  async deleteProfil(id) {
    const profil = await profilRepository.delete(id);
    if (!profil) {
      throw new Error('Impossible de supprimer le profil');
    }
    return profil;
  }

  async getProfilByName(nom) {
    return await profilRepository.findByName(nom);
  }
}

module.exports = new ProfilService();