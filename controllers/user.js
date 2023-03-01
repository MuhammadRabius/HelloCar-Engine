const User = require("../models/user");
const dotenv = require("dotenv").config();
var jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    let user;
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      if (userExists.password == password) {
        user = userExists;
        message = "Logged in successfully";

        // create jwt
        const token = jwt.sign(
          {
            userId: user._id,
            email: user.email,
          },
          `${process.env.JWT_ACC_TOKEN}`,
          { expiresIn: "24h" }
        );

        res.status(200).json({
          success: true,
          message: message,
          data: user,
          token: token,
        });
      } else {
        const error = new Error(`Wrong password!`);
        message = error.message;

        res.status(200).json({
          success: true,
          message: message,
        });
      }
    } else {
      const error = new Error(`User not found!`);
      message = error.message;
      res.status(200).json({
        success: true,
        message: message,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Something went wrong on database operation!";
    }
    next(err);
  }
};

exports.registration = async (req, res, next) => {
  try {
    const email = req.body.email;

    let user;
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      const error = new Error(`A user with this email already registered!`);
      user = userExists;
      message = error.message;
      res.status(200).json({
        success: false,
        message: message,
      });
    } else {
      const userData = new User(req.body);
      const newUser = await userData.save();
      user = newUser;
      message = "Successfully register user";

      res.status(201).json({
        success: true,
        message: message,
        data: user,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
