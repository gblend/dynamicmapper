const {adaptRequest} = require('../../app/lib/utils');

describe('AdaptRequest', () => {
	it('should return extracted request object with value as undefined', () => {
		const req = {
			path: undefined,
			method: undefined,
			body: undefined,
			queryParams: {},
			pathParams: undefined
		};

		expect(adaptRequest({})).toMatchObject(req);
	});

	it('should return extracted request object', () => {
		const _req = {
			path: '/api/v1/status',
			method: 'GET',
			body: {},
			queryParams: {},
			pathParams: {}
		};

		expect(adaptRequest(_req)).toMatchObject(_req);
	});
});

