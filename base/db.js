const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    
    console.log("MongoDB connecté avec Mongoose");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;