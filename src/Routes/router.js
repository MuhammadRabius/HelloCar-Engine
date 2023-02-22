import { Router } from "express";
const router = Router();

// Import all controller
import * as controller from "./../Controllers/controller.js";
// POST Method-----------
router.route("/register").post(controller.register);
// router.route("/register-mail").post((req, res) => res.json("Register User"));
router.route("/authentication").post((req, res) => res.end);
router.route("/login").post(controller.login);
// GET Method---------
router.route("/username/:individual-user").get(controller.indiviualUser);
router.route("/generateOTP").get(controller.generateOTP);
router.route("/verifyOTP").get(controller.VerifyOTP);
router.route("createResetSession").get(controller.createResetSession);

// PUT Method
router.route("/update-user").put(controller.updateUser);
router.route("/reset-password").put(controller.resetPassword);

export default router;
