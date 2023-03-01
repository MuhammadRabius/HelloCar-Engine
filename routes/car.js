// Main Module Required..
const express = require("express");
const controller = require("../controllers/car");

const router = express.Router();

/**
 * /api/car
 * http://localhost:8000/api/cars
 */

router.post("/create-car", controller.createCar);
router.get("/my-car", controller.getCar);
router.put("/update-car/:id", controller.updateCar);
router.put("/offer-car/:id", controller.offerCar);
router.delete("/delete-car/:id", controller.deleteCar);

// Export All router..
module.exports = router;
