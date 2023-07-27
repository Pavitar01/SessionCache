const express = require("express");
const { default: axios } = require("axios");
const app = express();
const cacheService = require("express-api-cache");
const cache = cacheService.cache;
const {
  CreateUserController,
  loginUser,
} = require("../controller/UserController");

const UserRoutes = express.Router();

// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["", "hello01"],
//     maxAge: 6000, //max age of the session
//   })
// );

UserRoutes.post("/create-user", CreateUserController);
UserRoutes.post("/login-user", cache("10 minutes"), loginUser);

module.exports = { UserRoutes };
