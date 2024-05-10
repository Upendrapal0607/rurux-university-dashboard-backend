const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Auth } = require("../middleware/auth.midleware");
const { studentModel } = require("../models/student.model");
require("dotenv").config();

const studentRoute = express.Router();
studentRoute.use(Auth);
studentRoute.get("/", async (req, res) => {
  try {
    const studentList = await studentModel.find();
    res.status(200).json({ studentList });
  } catch (error) {
    res.status(200).send({ mess: error });
  }
});

studentRoute.post("/register", async (req, res) => {
  const studentData = req.body;
  console.log({ studentData });
  try {
    const AlraidyExitst = await studentModel.findOne({
      username: studentData.username,
    });
    console.log({ AlraidyExitst });
    if (AlraidyExitst) {
      res.status(200).json({
        message: `student whose username is ${studentData.username} alraiday resistered`,
      });
    } else {
      const studentRegistered = new studentModel(studentData);
      console.log({ studentRegistered });
      await studentRegistered.save();

      res.status(200).send({ message: "new student resistered" });
    }
  } catch (error) {
    res.status(404).send({ message: "error", error });
  }
});
studentRoute.patch("/update/:paramId", async (req, res) => {
  const { paramId } = req.params;
  try {
    const AlraidyExitst = await studentModel.findOne({ _id: paramId });
    console.log({ AlraidyExitst });

    if (!AlraidyExitst) {
      res.status(200).json({
        message: `student not found`,
      });
    } else {
      await studentModel.findByIdAndUpdate({ _id: paramId }, req.body);
      res.status(200).send({ message: "student data updated" });
    }
  } catch (error) {
    res.status(404).send({ message: "error", error });
  }
});
studentRoute.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const student = await studentModel.findOne({ username, password });
    if (student) {
      res.status(200).send({ student });
    } else {
      res.status(200).send({ message: "please provid username and password" });
    }
  } catch (error) {
    res.status(200).send({ message: error });
  }
});

module.exports = {
  studentRoute,
};
