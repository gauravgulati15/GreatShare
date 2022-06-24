const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
// const dotenv = require("dotenv").config();
const app =  require("./server.js");
const { Sequelize } = require("sequelize-cockroachdb");

const Notification = require("./Notification/Models/notificationTable");


const sequelize = new Sequelize(process.env.DATABASE_URL);

// dotenv.config();

(async () => {
  try {
    await Notification.sync({ force: false });
  } catch (err) {
    console.error("error executing query:", err);
  } finally {
    await sequelize.close();
  }
})();

const port = process.env.PORT || 8000;
const host = process.env.HOST || "localhost";

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
    }
);
