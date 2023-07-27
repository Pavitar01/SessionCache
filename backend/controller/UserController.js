const { userModel } = require("../model/UserModel");
const app = require("express")();
const session = require("express-session");
app.use(
  session({
    secret: "hello01@aa",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
); //1min
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["", "hello01"],
//     maxAge: 6000, //max age of the session
//   })
// );
const CreateUserController = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      return res.send("Please Enter Name");
    }
    if (!password) {
      return res.send("Please Enter Password");
    }
    const isUser = await userModel.findOne({ username: username });
    if (!isUser) {
      const user = await new userModel({
        username,
        password,
      }).save();

      res.status(200).send({
        message: "User Add successfully!",
        success: true,
        user,
      });
    } else {
      res.send({
        success: false,
        message: "User Already Exists",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      return res.send("Please Enter Name");
    }
    if (!password) {
      return res.send("Please Enter Password");
    }
    const isUser = await userModel.findOne({
      username: username,
      password: password,
    });
    if (!isUser) {
      const user = await new userModel({
        username,
        password,
      }).save();

      res.status(200).send({
        message: "Please Register!",
        success: true,
        user,
      });
    } else {
      console.log("here");
      console.log(req.session);
      req.session.authorized = true;
      console.log("there");
      res.send({
        success: false,
        message: "Login SuccessFully !",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { CreateUserController, loginUser };
