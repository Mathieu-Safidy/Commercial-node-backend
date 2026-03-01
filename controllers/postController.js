const postService = require('../services/postService');


class PostController {
    static async createPost(req, res) {
        try {
            const { idUser, description } = req.body;
            const images = req.files ? req.files.map(file => file.path) : [];
            const post = await postService.createPost(idUser, description, images);
            res.status(201).json(post);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    static async getPostByRole(req, res) {
        try {
            const { idUser } = req.params;
            const posts = await postService.getPostsByRole(idUser);
            res.json(posts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    static async getAllPosts(req, res) {
        try {
            const posts = await postService.getAllPosts();
            res.json(posts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    static async getPostById(req, res) {
        try {
            const post = await postService.getPostById(req.params.id);
            res.json(post);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    static async updatePost(req, res) {
        try {
            const { id } = req.params;
            const { description } = req.body;
            console.log('Controller', id, description);
            const updatedPost = await postService.updatePost(id, description);
            res.status(200).json(updatedPost);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    static async deletePost(req, res) {
        try {
            const deletedPost = await postService.deletePost(req.params.id);
            res.status(200).json(deletedPost);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = PostController;