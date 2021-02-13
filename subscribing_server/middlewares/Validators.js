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

    url: [
        body('url').isString().trim()
    ],

    topic:[
        body('topic').isString().trim()

    ]
   

    
}


