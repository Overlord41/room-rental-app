/* eslint-disable no-unused-vars */
const express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
var cors = require("cors");

const app = express();
app.use(cors());
// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// catch 404 and forward to error handler
app.use(function (req, res) {
  res.sendStatus(404);
});
// error handler
app.use(function (err, req, res, next) {
  console.error(err);
  res.sendStatus(500);
});

module.exports = app;
