/**
 *
 * Admin Routes
 */


const express = require("express");
const router = express.Router();
const IndexController = require("../controllers/IndexController");


const {
    validate,
    url,
    topic
} = require('../middlewares/Validators');

/**
 * Users routes
 */

router.post('/add/topic',validate(topic), IndexController.addTopic);
router.post('/:topic', IndexController.subscribe);
router.post('/receive/notification', IndexController.receiveNotification);
// router.post('/login',validate(login_user), IndexController.login);

// router.use('/',Authentication, Authorization([]), AuthRouter);
module.exports = router;