const Car = require("../models/car");

exports.createCar = async (req, res, next) => {
  try {
    const carData = new Car(req.body);
    const newCar = await carData.save();
    message = "Successfully Added New Car";

    res.status(201).json({
      success: true,
      message: message,
      data: newCar,
    });
  } catch (err) {
    console.log(err);
  }
};
