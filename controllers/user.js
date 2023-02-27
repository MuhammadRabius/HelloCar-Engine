const User = require("../models/user");

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
      } else {
        const error = new Error(`Wrong password!`);
        message = error.message;
      }
    } else {
      const error = new Error(`User not found!`);
      message = error.message;
    }

    res.status(200).json({
      success: true,
      message: message,
      data: user,
    });
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
      res.status(400).json({
        success: false,
        message: message,
        data: user,
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
