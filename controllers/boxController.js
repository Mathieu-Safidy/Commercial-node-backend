const boxService = require("../services/boxService");

class BoxController {


    async getBoxes(req, res) {
        try {
            const boxes = await boxService.getAllBoxes();
            res.json(boxes);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }


    async getBoxById(req, res) {
        try {
            const box = await boxService.getBoxById(req.params.id);
            if (!box) return res.status(404).json({ message: "Box introuvable" });
            res.json(box);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }


    async createBox(req, res) {
        try {
            const box = await boxService.createBox(req.body);
            res.status(201).json(box);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }


    async updateBox(req, res) {
        try {
            const updatedBox = await boxService.updateBox(req.params.id, req.body);
            if (!updatedBox) return res.status(404).json({ message: "Box introuvable" });
            res.json(updatedBox);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }


    async deleteBox(req, res) {
        try {
            const deletedBox = await boxService.deleteBox(req.params.id);
            if (!deletedBox) return res.status(404).json({ message: "Box introuvable" });
            res.json({ message: "Box supprimé avec succès" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

}

module.exports = new BoxController();
