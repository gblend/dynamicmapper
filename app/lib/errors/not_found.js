'use strict';

const {StatusCodes} = require('../utils');
const CustomAPIError = require('./custom_api');

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError;
