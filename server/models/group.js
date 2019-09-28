const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GroupSchema = new Schema({
  groupId: String,
  authorId: String,
  name: String
});
module.exports = mongoose.model("Group", GroupSchema);
