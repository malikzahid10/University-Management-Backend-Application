const app = require("./app");
const sequelize = require("../src/config/database");
require("dotenv").config();

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Application Start On Port : ${PORT}`);
  } catch (error) {
    console.log();
    console.log("Unable to Connect Database", error);
  }
});
