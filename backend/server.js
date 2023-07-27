const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const session = require("express-session");

const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { UserRoutes } = require("./routes/userRoutes");
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(
  session({
    secret: "hello01@aa",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use("/api/user", UserRoutes);

const db = mongoose
  .connect(process.env.Mongo)
  .then((result) => {
    console.log("Connected To DB", result.connection.host);
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log("Server is listening");
});
