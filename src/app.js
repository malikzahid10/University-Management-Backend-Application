const express = require("express");
const userRouter = require("./routes/user.routes");

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "University Backend App is Created!",
  });
});

module.exports = app;
