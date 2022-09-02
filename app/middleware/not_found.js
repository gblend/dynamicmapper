'use strict';

const {StatusCodes} = require('../lib/utils');

const notFound = (_, res) => res.status(StatusCodes.NOT_FOUND).json({
    message: 'Route does not exist.'
})

module.exports = notFound
