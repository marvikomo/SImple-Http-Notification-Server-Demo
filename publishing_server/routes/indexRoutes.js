/**
 *
 * Admin Routes
 */


const express = require("express");
const router = express.Router();
const IndexController = require("../controllers/IndexController");


const {
    validate,
    register_admin,
    login_user,
    register_agent,
    change_password,
    register_card,
    register_terminal,
    register_vehicle_tag,
    card_link_account
} = require('../middlewares/Validators');

/**
 * Users routes
 */



router.post('/event', IndexController.handleEvent)
router.post('/:topic', IndexController.publish)

module.exports = router;