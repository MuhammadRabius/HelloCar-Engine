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

// get  data
exports.getCar = async (req, res, next) => {
  try {
    const carData = await Car.find({});
    message = "Successfully fetch Cars";

    res.status(200).json({
      success: true,
      message: message,
      data: carData,
    });
  } catch (err) {
    console.log(err);
  }
};

// update Data --
exports.updateCar = async (req, res, next) => {
  try {
    const id = req.params.id;
    const carData = await Car.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    message = "Successfully Update";

    res.status(201).json({
      success: true,
      message: message,
      data: carData,
    });
  } catch (err) {
    console.log(err);
  }
};

// Delete Data
exports.deleteCar = async (req, res, next) => {
  try {
    const id = req.params.id;
    const carData = await Car.findOneAndDelete({ _id: id });
    message = "Successfully Delete";

    res.status(200).json({
      success: true,
      message: message,
    });
  } catch (err) {
    console.log(err);
  }
};

//// update Offer Data --
exports.offerCar = async (req, res, next) => {
  try {
    const id = req.params.id;
    const carData = await Car.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    message = "Successfully Update";

    res.status(201).json({
      success: true,
      message: message,
      data: carData,
    });
  } catch (err) {
    console.log(err);
  }
};
