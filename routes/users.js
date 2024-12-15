const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    default: null
  },
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    default: null
  },
  profileImage: {
    type: Buffer,
    default: null
  },
  password: String,
  posts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "post"
  }],
  otp: {
    type: String,
    default: null
  },
  otpExpiry: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model("userModel", userSchema);

