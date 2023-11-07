const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const infoSchema = new Schema({
  name: { type: String },
  desc: { type: String },
  asgn :{type:String}
});

const Info = mongoose.model("Info",infoSchema);
module.exports = Info;