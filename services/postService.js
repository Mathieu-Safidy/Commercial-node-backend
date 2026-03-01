const PostModel = require("../models/postModel");
const PostImagesModel = require("../models/postImagesModel");
const userModel = require("../models/userModel");
const boutiqueModel = require("../models/boutiqueModel");

class PostService {
  static async createPost(idUser, description, images) {
    const post = new PostModel({
      idUser,
      description,
    });

    const publishedPost = await post.save();

    if (images && images.length > 0) {
      images.forEach((image) => {
        const postImage = new PostImagesModel({
          idPost: publishedPost._id,
          link: image,
          createdAt: new Date(),
        });
        postImage.save();
      });
    }
    return await PostModel.findById(publishedPost._id).populate("images");
  }

  static async getAllPosts() {
    return await PostModel.find({ deletedAt: null }).populate([
      { path: "images" },
      {
        path: "idUser",
        populate: { path: "idProfil" },
      },
    ]);
  }

  static async getPostById(id) {
    return await PostModel.findOne({ _id: id, deletedAt: null }).populate(
      "images",
    );
  }

  static async deletePost(id) {
    return await PostModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true },
    );
  }

  static async getPostsByRole(idUser) {
    const user = await userModel.findById(idUser).populate("idProfil");
    console.log(user, idUser);
    let posts;

    switch (user.idProfil.nom) {
      case "Boutique": {
        posts = await PostModel.find({ idUser, deletedAt: null }).populate([
          { path: "images" },
          {
            path: "idUser",
            populate: { path: "idProfil" },
          },
        ]);
        break;
      }
      case "User": {
        posts = await PostModel.find({ deletedAt: null }).populate([
          { path: "images" },
          {
            path: "idUser",
            populate: { path: "idProfil" },
          },
        ]);
        break;
      }
      case "Admin":
        posts = await PostModel.find({ deletedAt: null }).populate([
          { path: "images" },
          {
            path: "idUser",
            populate: { path: "idProfil" },
          },
        ]);
        break;
      default:
        throw new Error("Invalid role");
    }
    let postsFinal = Promise.all(posts.map(async (post) => {
      const boutiquePosts = await boutiqueModel.findOne({
        idUser: post.idUser._id,
      });
      if (boutiquePosts) {
        return {
          ...post.toObject(),
          nom: boutiquePosts.nom,
        };
      } else {
        return {
          ...post.toObject(),
          nom: post.idUser._id,
        };
      }
    }));
    return postsFinal;
  }

  static async updatePost(id, description, images) {
    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { description, modifiedAt: new Date() },
      { new: true },
    );
    // if (images && images.length > 0) {
    //     await PostImagesModel.deleteMany({ idPost: id });
    //     images.forEach(image => {
    //         const postImage = new PostImagesModel({
    //             idPost: id,
    //             link: image,
    //             createdAt: new Date()
    //         });
    //         postImage.save();
    //     });
    // }
    return await PostModel.findById(id).populate("images");
  }
}

module.exports = PostService;
