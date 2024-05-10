const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const adminRoute = express.Router();

adminRoute.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log({ username, password });
  try {
    if (username == "admin" && password == "admin") {
      console.log("hello admin");
      const token = jwt.sign(
        { username },
        process.env.ADMIN_LOGIN_SECRET_KEY || "admin_login_secret",
        { expiresIn: "7d" }
      );

      console.log({ token });
      res.status(200).send({ message: "login successful", token });
    } else {
      res
        .status(200)
        .send({ message: "please provid correct admin name and password" });
    }
  } catch (error) {
    res.status(200).send({ message: "error", error });
  }
});

module.exports = {
  adminRoute,
};
