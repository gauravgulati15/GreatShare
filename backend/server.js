require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var notifications = require("./Notification/Routes/notificationRoutes");
var verify = require("./Verify/Routes/verifyRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/notifications", notifications);
app.use("/verify", verify);
app.use("/", (req, res)=>{
    res.send(`<h1>Server up and running</h1>`);
});
app.use("*", (req, res) => {
  res.send(`<h1>404</h1>`);
});

module.exports = app;