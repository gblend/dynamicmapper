'use strict';

const morgan = require('morgan');
const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const {config} = require('./app/config/config');
const connectDB = require('./app/config/db/connect');
const {logger, appStatus} = require('./app/lib/utils');
const {handle} = require('./app/middleware/handle_event');
const notFoundMiddleware = require('./app/middleware/not_found');
const resInterceptor = require('./app/middleware/res_interceptor');
const errorHandlerMiddleware = require('./app/middleware/error_handler');
const app = express();

const apiRateLimiter = rateLimit({
	windowMs: config.rateLimiter.windowMs,
	max: config.rateLimiter.max,
	standardHeaders: true,
});

module.exports = {
	morgan,
	errorHandlerMiddleware,
	notFoundMiddleware,
	connectDB,
	mongoSanitize,
	apiRateLimiter,
	helmet,
	xss,
	cors,
	logger,
	express,
	app,
	appStatus,
	resInterceptor,
	handle,
	config: {
		appEnv: config.app.env,
		dbUri: config.database.uri,
		appPort: config.app.port,
		baseUrl: config.app.baseUrl,
		appName: config.app.name
	}
}
