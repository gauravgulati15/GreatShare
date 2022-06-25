require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var comments = require("./Comments/Routes/commentsRoutes.js");
var user = require("./User/Routes/userRoutes");
var moderator = require("./Moderator/Routes/moderatorRoutes");
var posts = require("./Post/Routes/postRoutes");
var review = require("./Review/Routes/reviewRoutes");
var notifications = require("./Notification/Routes/notificationRoutes");
var verify = require("./Verify/Routes/verifyRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/comments", comments);
app.use("/user", user);
app.use("/moderator", moderator);
app.use("/posts", posts);
app.use("/review", review);
app.use("/notifications", notifications);
app.use("/verify", verify);
app.use("/", (req, res)=>{
    res.send(`<h1>Server up and running</h1>`);
});
app.use("*", (req, res) => {
  res.send(`<h1>404</h1>`);
});

module.exports = app;