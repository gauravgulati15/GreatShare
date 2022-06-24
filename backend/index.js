const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
// const dotenv = require("dotenv").config();
const app =  require("./server.js");
const { Sequelize } = require("sequelize-cockroachdb");


// dotenv.config();

const port = process.env.PORT || 8000;
const host = process.env.HOST || "localhost";

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
    }
);
