const mongoose = require("mongoose");
const subjectSchema = mongoose.Schema({
  stream: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },
});

const subjectModel = mongoose.model("subject", subjectSchema);

module.exports = {
  subjectModel,
};
