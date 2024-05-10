const mongoose = require("mongoose");
const streamSchema = mongoose.Schema({
  stream: {
    type: String,
    required: true,
  },
});

const streamModel = mongoose.model("stream", streamSchema);

module.exports = {
  streamModel,
};
