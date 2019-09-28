const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  groupId: String,
  authorId: String,
  image: String,
  teaser: String,
  title: String,
  text: String,
  likes: Array,
  viewed: Number,
  buy: Boolean,
  html: String
});
module.exports = mongoose.model("Post", PostSchema);
