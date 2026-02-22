const Box = require("../models/boxModel");

class BoxRepository {

    async create(data) {
        return Box.create(data);
    }

    async findAll() {
        return Box.find({ deletedAt: null });
    }

    async findById(id) {
        return Box.findById(id);
    }

    async update(id, data) {
        return Box.findByIdAndUpdate(id, data, { new: true });
    }

    async softDelete(id) {
        return Box.findByIdAndUpdate(
            id,
            { deletedAt: new Date() },
            { new: true }
        );
    }

    async delete(id) {
        return Box.findByIdAndDelete(id);
    }
}

module.exports = new BoxRepository();
