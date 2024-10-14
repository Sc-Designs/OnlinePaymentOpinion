const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
const connectDB = async()=>{
  await mongoose.connect(
    "mongodb+srv://nfgaming4523:kWGZJd299BcKiEKR@users.fau7n.mongodb.net/?retryWrites=true&w=majority&appName=Users"
  );
} 
connectDB()
const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  username: String,
  profileImage: Buffer,
  password: String,
  posts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "post"
  }]
});
userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);
