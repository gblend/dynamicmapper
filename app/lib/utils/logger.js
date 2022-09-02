'use strict';

const winston = require('winston');
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

const createLogger = () => {
    return winston.createLogger({
        format: winston.format.json(),
        defaultMeta: {service: 'dynamicMapper-backend'},
        transports: [
            new winston.transports.File({
                level: 'error',
                filename: './logs/errors.log',
                format: winston.format.combine(
                    winston.format.timestamp({format: timestampFormat}),
                    winston.format.align(),
                    winston.format.colorize({colors: {error: 'red'}}),
                    winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
                )
            }),
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp({format: timestampFormat}),
                    winston.format.align(),
                    winston.format.colorize({colors: {info: 'green'}}),
                    winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
                )
            })
        ]
    });
}

module.exports = {logger: createLogger()}
