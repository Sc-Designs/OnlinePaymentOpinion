const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
const connectDB = async()=>{
  await mongoose.connect("mongodb://127.0.0.1:27017/CashLessIndia");
} 
connectDB()
const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  username: String,
  profileImage: String,
  password: String,
  posts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "post"
  }]
});
userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);
