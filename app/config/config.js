'use strict';

require('dotenv').config();

const config = {
    app: {
        port: process.env.APP_PORT || 3000,
        name: process.env.APP_NAME || 'dynamicMapper',
        env: process.env.NODE_ENV,
        baseUrl: (process.env.NODE_ENV === 'production') ? process.env.BASE_URL_PROD : process.env.BASE_URL_DEV
    },
    rateLimiter: {
        windowMs: process.env.RATE_LIMIT_WINDOW_MS,
        max: process.env.RATE_LIMIT_MAX,
    },
    database: {
        uri: process.env.MONGO_URI,
    }
}

module.exports = {config}
