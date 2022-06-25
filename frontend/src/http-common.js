const axios = require("axios");

const http = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json",
  },
});

module.exports = http;
