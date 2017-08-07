var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NySchema = new Schema({
  title: {
    type: String
  },
  date: {
    type: Date
  },
    url: {
      type:String
    }
});

var Ny = mongoose.model("Ny", NySchema);
module.exports = Ny;