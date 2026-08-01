const express = require("express");
const userRouter = require("./routes/user.routes");
const passport = require("passport");
const roleRouter = require("./routes/role.routes");
const permissionRouter = require("./routes/permission.routes");

const app = express();

app.use(express.json());

app.use(passport.initialize());

app.use("/api/users", userRouter);
app.use("/api/roles", roleRouter);
app.use("/api/permissions", permissionRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "University Backend App is Created!",
  });
});

module.exports = app;
