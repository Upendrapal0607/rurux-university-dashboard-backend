const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
  ID: {
    type: String,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  stream: {
    type: String,
    required: true,
  },
});

const studentModel = mongoose.model("students", studentSchema);

module.exports = {
  studentModel,
};
