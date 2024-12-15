const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  text: "string",
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  date:"string"
});
module.exports = mongoose.model('post',postSchema);