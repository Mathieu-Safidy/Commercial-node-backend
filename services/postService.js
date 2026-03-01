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

  const user = await userModel
    .findById(idUser)
    .populate("idProfil")
    .lean();

  if (!user) throw new Error("User not found");

  const isBoutique = user.idProfil.nom === "Boutique";

  // ✅ Une seule requête Post
  const posts = await PostModel.find({
    deletedAt: null,
    ...(isBoutique && { idUser }) // filtre seulement si boutique
  })
  .sort({ createdAt: -1 })
  .populate([
    { path: "images" },
    { 
        path: "comment",
        populate: { path: "idUser" }
     },
    {
      path: "idUser",
      populate: { path: "idProfil" }
    }
  ])
  .lean();

  // ✅ Récupérer toutes les boutiques d’un coup
  const userIds = posts.map(p => p.idUser._id);

  const boutiques = await boutiqueModel.find({
    idUser: { $in: userIds }
  }).lean();

  const boutiqueMap = new Map(
    boutiques.map(b => [b.idUser.toString(), b.nom])
  );

  // ✅ Transformation finale
  const postsFinal = posts.map(post => {
    const role = post.idUser.idProfil.nom;

    return {
      ...post,
      nom:
        boutiqueMap.get(post.idUser._id.toString()) ??
        (role === "Admin" ? "Admin" : post.idUser._id)
    };
  });

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
