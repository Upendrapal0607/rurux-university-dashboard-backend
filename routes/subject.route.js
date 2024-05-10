const express = require("express");
const { Auth } = require("../middleware/auth.midleware");
const { subjectModel } = require("../models/subject.model");

const subjectRoute = express.Router();
subjectRoute.use(Auth);

subjectRoute.get("/", async (req, res) => {
  try {
    const subjectList = await subjectModel.find();
    res.status(200).json({
      subjectList,
    });
  } catch (error) {
    res.status(400).json({ message: "error", error });
  }
});
subjectRoute.post("/", async (req, res) => {
  const data = req.body;
  console.log({ data });
  try {
    const checksubject = await subjectModel.findOne({ subject: data.subject });
    console.log({ checksubject });
    if (checksubject) {
      res.status(200).json({ message: "subject already exist" });
    } else {
      const Createdsubject = new subjectModel(data);
      console.log({ Createdsubject });
      await Createdsubject.save();
      res.status(200).json({ message: "new subject added" });
    }
  } catch (error) {
    res.status(400).json({ error, message: "error" });
  }
});

subjectRoute.patch("/update/:paramId", async (req, res) => {
  const { paramId } = req.params;
  console.log({ body: req.body });
  try {
    const checkSubject = await subjectModel.findOne({ _id: paramId });
    console.log({ checkSubject });
    if (checkSubject) {
      await subjectModel.findByIdAndUpdate({ _id: paramId }, req.body);
      res.status(200).json({ msg: `subject has been updated` });
    } else {
      res.status(200).json({ messag: "Subject is not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
});

subjectRoute.delete("/delete/:paramId", async (req, res) => {
  const { paramId } = req.params;
  try {
    const checkSubject = await subjectModel.findOne({ _id: paramId });
    if (checkSubject) {
      await subjectModel.findByIdAndDelete({ _id: paramId });
      res.status(200).json({ message: `subject has been deleted` });
    } else {
      res.status(200).json({ msg: `subject not found` });
    }
  } catch (error) {
    res.status(400).json({ message: "error", error });
  }
});

module.exports = {
  subjectRoute,
};
