// Main Module Required..
const express = require('express');
const controller = require('../controllers/user');

const router = express.Router();

/**
 * /api/user
 * http://localhost:3000/api/user
 */


router.post('/registration', controller.registration);
router.post('/login', controller.login);




// Export All router..
module.exports = router;
