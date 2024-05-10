const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/db");
const { adminRoute } = require("./routes/admin.route");
const { studentRoute } = require("./routes/student.route");
const { streamRoute } = require("./routes/stream.route");
const { subjectRoute } = require("./routes/subject.route");
const { markRoute } = require("./routes/marks.route");
const PORT = process.env.PORT || 8080;
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello welcome to my backend server");
});

app.use("/admin", adminRoute);
app.use("/student", studentRoute);
app.use("/stream", streamRoute);
app.use("/subject", subjectRoute);
app.use("/marks", markRoute);

app.use((req, res, next) => {
  res.status(404).send({ message: "route Not found" });
});

app.listen(PORT, async () => {
  console.log("Example app listening on port 8080!");
  try {
    await dbConnection;
    console.log("DB is connected");
  } catch (error) {
    console.log({ error });
  }
});
