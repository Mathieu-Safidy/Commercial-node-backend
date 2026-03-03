const Box = require("../models/boxModel");

class BoxRepository {

    static async create(data) {
        return Box.create(data);
    }

    static async findAll() {
        return Box.find({ deletedAt: null });
    }

    static async findById(id) {
        return Box.findById(id);
    }

    static async update(id, data) {
        return Box.findByIdAndUpdate(id, data, { new: true });
    }

    static async softDelete(id) {
        return Box.findByIdAndUpdate(
            id,
            { deletedAt: new Date() },
            { new: true }
        );
    }

    static async delete(id) {
        return Box.findByIdAndDelete(id);
    }
}

module.exports = BoxRepository;
