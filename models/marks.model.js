const mongoose = require("mongoose");
const marksSchema = mongoose.Schema({
  studentId: {
    type: String,
  },
  subject: {
    type: String,
  },
  mark: {
    type: Number,
  },
});

const marksModel = mongoose.model("marksList", marksSchema);

module.exports = {
  marksModel,
};
