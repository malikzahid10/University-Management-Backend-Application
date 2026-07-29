const app = require("./app");
const sequelize = require("../src/config/database");
require("dotenv").config();
require("../src/model/user.model");
require("../src/model/student.model");
require("../src/model/role.model");

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log(`Application Start On Port : ${PORT}`);
  } catch (error) {
    console.log();
    console.log("Unable to Connect Database", error);
  }
});
