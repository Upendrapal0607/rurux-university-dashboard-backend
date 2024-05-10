const express = require("express");
const { Auth } = require("../middleware/auth.midleware");
const { streamModel } = require("../models/stream.model");

const streamRoute = express.Router();
// streamRoute.use(Auth);

streamRoute.get("/", async (req, res) => {
  try {
    const StrimList = await streamModel.find();
    res.status(200).json({
      StrimList,
    });
  } catch (error) {
    res.status(400).json({ message: "error", error });
  }
});
streamRoute.post("/addstream", async (req, res) => {
  const data = req.body;
  console.log({ data });
  try {
    const checkstream = await streamModel.findOne({ stream: data.stream });
    if (checkstream) {
      res.status(200).json({ message: "stream already exist" });
    } else {
      const CreatedStream = new streamModel(data);
      console.log({ CreatedStream });
      await CreatedStream.save();
      res.status(200).json({ message: "new stream created" });
    }
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
});

streamRoute.patch("/update/:paramId", async (req, res) => {
  const { paramId } = req.params;
  console.log({ body: req.body });
  try {
    const checkstream = await streamModel.findOne({ _id: paramId });
    console.log({ checkstream });
    if (checkstream) {
      await streamModel.findByIdAndUpdate({ _id: paramId }, req.body);
      res.status(200).json({ msg: `stream has been updated` });
    } else {
      res.status(200).json({ messag: "stream is not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
});

streamRoute.delete("/delete/:paramId", async (req, res) => {
  const { paramId } = req.params;
  console.log({ paramId });
  try {
    const checkStream = await streamModel.findOne({ _id: paramId });
    if (checkStream) {
      await streamModel.findByIdAndDelete({ _id: paramId });
      res.status(200).json({ message: `stream has been deleted` });
    } else {
      res.status(200).json({ msg: `Stream not found` });
    }
  } catch (error) {
    res.status(400).json({ message: "error", error });
  }
});

module.exports = {
  streamRoute,
};
