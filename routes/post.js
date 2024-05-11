const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
  text: "string",
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date:"string"
});
module.exports = mongoose.model('post',postSchema);