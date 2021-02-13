"use strict";
const {body, query, validationResult} = require('express-validator');
const {sendResponse} = require('../helpers/ResponseHelper');

module.exports = {
    validate(values = []) {
        return async (req, res, next) => {
            await Promise.all(values.map(value => value.run(req)));

            const errors = validationResult(req);
            if (errors.isEmpty()) {
                return next();
            }
            let _errors = errors.array();
            let message = "Invalid parameters:";

            _errors.forEach((v) => {
                message += ` ${v.param},`;
            })

            sendResponse(res, 403, errors.array(), false, message);
        };
    },

    register_admin: [
        body('first_name').isString().trim(),
        body('last_name').isString().trim(),
        body('email').isEmail().normalizeEmail(),
        body('phone').isMobilePhone('en-NG'),
        body('admin_type').isNumeric()
    ],

    register_user: [
        body('first_name').isString().trim(),
        body('email').isEmail().normalizeEmail(),
        body('phone').isMobilePhone('en-NG'),
        body('password').isString(),
        body('last_name').isString().trim(),
        body('business_name').isString().optional(),
        body('business_address').isString().optional(),
        body('payer_id').isString().optional()
    ],

    agent_register_payer: [
        body('first_name').isString().trim(),
        body('email').isEmail().normalizeEmail(),
        body('phone').isMobilePhone('en-NG'),
        body('last_name').isString().trim(),
        body('business_name').isString().optional(),
        body('business_address').isString().optional(),
        body('payer_id').isString().optional()
    ],

    register_agent: [
        body('first_name').isString().trim(),
        body('email').isEmail().normalizeEmail(),
        body('phone').isMobilePhone('en-NG'),
        body('last_name').isString().trim(),
        body('agent_type').isString(),
        body('payer_id').isString().optional(),
        body('port_id').isNumeric().optional(),
        body('garage_id').isNumeric().optional()
    ],

    login_user: [
        body('email').isString(),
        body('password').isString()
    ],

    change_password: [
        body('old_password').isString(),
        body('new_password').isString()
    ],

    register_vehicle_tag: [
        body('tag_no').isNumeric()
    ],

    register_card: [
        body('card_no').isString()
    ],

    register_terminal: [
        body('terminal_no').isString()
    ],

    agent_register_import_vehicle: [
        body('account_no').isString(),
        body('port_id').isNumeric(),
        body('vehicle_identification_number').isString(),
        body('vehicle_type').isNumeric(),
        body('vehicle_color').isString(),
        body('vehicle_brand').isString(),
        body('vehicle_year').isString(),
        body('vehicle_model').isString()
    ],

    agent_register_commercial_vehicle: [
        body('account_no').isString(),
        body('garage_id').isNumeric(),
        body('plate_number').isString(),
        body('vehicle_type').isNumeric(),
        body('vehicle_color').isString().optional(),
        body('vehicle_brand').isString().optional(),
        body('vehicle_year').isString().optional(),
        body('vehicle_model').isString().optional()
    ],

    agent_link_vehicle_tag: [
        body('tag_id').isString(),
        body('vehicle_id').isNumeric()
    ],

    paystack_redirect: [
        query('reference').isString()
    ],

    paystack_webhook: [
        body('event').isString(),
        body('data').isString()
    ],

    agent_charge_commercial_vehicle: [
        body('system_identifier').isString()
    ],

    card_link_account: [
        body('card_id').isNumeric(),
        body('account_id').isNumeric()
    ],

    add_port: [
        body('name').isString()
    ],

    add_local_government: [
        body('name').isString(),
        body('contact_person').isString(),
        body('contact_person_phone').isMobilePhone('en-NG'),
        body('chairman_name').isString().optional(),
        body('chairman_phone').isMobilePhone('en-NG').optional()
    ],

    add_garage: [
        body('name').isString(),
        body('local_government_id').isString(),
        body('vehicle_type_id').isString(),
        body('chairman_name').isString().optional(),
        body('chairman_phone').isMobilePhone('en-NG').optional()
    ]
}


