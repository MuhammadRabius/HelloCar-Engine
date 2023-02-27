// Main Module Required..
const express = require("express");
const controller = require("../controllers/car");

const router = express.Router();

/**
 * /api/user
 * http://localhost:3000/api/user
 */

router.post("/create-car", controller.createCar);

// Export All router..
module.exports = router;
