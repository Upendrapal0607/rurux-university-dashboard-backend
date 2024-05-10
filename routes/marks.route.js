const express = require("express");
const { Auth } = require("../middleware/auth.midleware");
const { marksModel } = require("../models/marks.model");
const markRoute = express.Router();

// markRoute.use(Auth);

markRoute.get("/", async (req, res) => {
  try {
    const marksList = await marksModel.find();
    res.status(200).json({
      marksList,
    });
  } catch (error) {
    res.status(400).json({ message: "error", error });
  }
});
markRoute.post("/addmark", async (req, res) => {
  const data = req.body;
  console.log({ data });
  try {
    const CreatedMark = new marksModel(data);
    console.log({ CreatedMark });
    await CreatedMark.save();
    res.status(200).json({ message: "new subject marks added" });
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
});

markRoute.patch("/update/:paramId", async (req, res) => {
  const { paramId } = req.params;
  console.log({ body: req.body });
  try {
    const checkMark = await marksModel.findOne({ _id: paramId });
    console.log({ checkMark });
    if (checkMark) {
      await marksModel.findByIdAndUpdate({ _id: paramId }, req.body);
      res.status(200).json({ msg: `Subject mark has been change` });
    } else {
      res.status(200).json({ messag: "Subject is not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
});

markRoute.delete("/delete/:paramId", async (req, res) => {
  const { paramId } = req.params;
  try {
    const checkMark = await marksModel.findOne({ _id: paramId });
    if (checkMark) {
      await marksModel.findByIdAndDelete({ _id: paramId });
      res.status(200).json({ messag: `Subject mark has been deleted` });
    } else {
      res.status(200).json({ msg: `Subject not found` });
    }
  } catch (error) {
    res.status(400).json({ message: "error", error });
  }
});

module.exports = {
  markRoute,
};
