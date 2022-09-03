'use strict';

require('express-async-errors');
const {
	morgan,
	providerRouter,
	errorHandlerMiddleware,
	notFoundMiddleware,
	connectDB,
	mongoSanitize,
	apiRateLimiter,
	helmet,
	xss,
	cors,
	logger,
	config,
	app,
	express,
	resInterceptor,
	handle,
	appStatus,
} = require('./startup');

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use('/api', apiRateLimiter);
app.use(express.json({limit: '300kb'}));
app.use(express.urlencoded({extended: false}));
app.use(cors());
(config.appEnv === 'development') ? app.use(morgan('dev')) : '';

app.use(resInterceptor);
app.use('/api/v1/status', (req, res) => appStatus.compile(req, res));
app.use('/api/v1/provider', providerRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

process
	.on('SIGTERM', handle('SIGTERM'))
	.on('unhandledRejection', handle('unhandledRejection'))
	.on('uncaughtException', handle('uncaughtException'));

const start = () => {
	if (config.appEnv === 'test') return;
	connectDB(config.dbUri).then(() => {
		const appServer = app.listen(config.appPort, () => {
			logger.info(`${config.appName} server running: ${config.baseUrl}:${appServer.address().port}`);
		});
	});
}

start();

module.exports = app;
