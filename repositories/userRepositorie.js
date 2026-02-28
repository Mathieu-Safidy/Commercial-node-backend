const User = require('../models/userModel');

class UserRepository {
    async create(data) {
        return User.create(data);
    }
    async createSave(email, username, password, idProfil) {
        const user = new User({
                email,
                username,
                password,
                idProfil  
        });
        return user.save();
    }


    async findAll() {
        return User.find().populate('idProfil');
    }

    async findById(id) {
        return User.findOne({_id: id}).populate('idProfil');
    }

    async findByEmail(email) {
        return User.findOne({ email }).populate('idProfil');
    }

    async update(id, data) {
        return User.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return User.findByIdAndDelete(id);
    }
}

module.exports = new UserRepository();
