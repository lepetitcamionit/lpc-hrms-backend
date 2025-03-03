const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload({ useTempFiles: true }));

const indexRoutes = require("./routes/index");
app.use("/v1", indexRoutes);

app.use(ErrorHandler);

module.exports = app;
