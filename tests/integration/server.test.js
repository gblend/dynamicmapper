const {tearDownTestConnection} = require('../helpers/connection_teardown');
const {connection} = require('mongoose');
const app = require('../../server');
const request = require('supertest')(app);
const Joi = require('joi');

describe('App', () => {
	afterAll( async () => {
		await tearDownTestConnection();
	});

	it('should successfully initialize app instance',() => {
		expect(Object.keys((connection.models)).length).toBeGreaterThanOrEqual(0);
		expect(app).toBeDefined();
		expect(app.locals.settings.env).toEqual('test');
	});

	it('should return app status', (done) => {
		request.get('/api/v1/status')
			.set('Content-Type', 'application/json')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect((response) => {

				const appStatusSchema = Joi.object({
					status: Joi.string(),
					message: Joi.string().required(),
					data: Joi.object({
						info: Joi.object({
							name: Joi.string().required(),
							node_version: Joi.string().required(),
							app_version: Joi.string().required()
						}).options({allowUnknown: true})
					})
				});

				Joi.assert(response.body, appStatusSchema);
			})
			.expect(200)
			.end(done);
	});
});
