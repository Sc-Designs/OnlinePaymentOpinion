const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
const connectDB = async()=>{
  await mongoose.connect("mongodb+srv://suvam:suvam123@cashlessindia.mrzvr4f.mongodb.net/CashLessIndia");
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
